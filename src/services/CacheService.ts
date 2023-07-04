/**
 * imports
 */

// external
import { Container, inject, injectable } from "inversify";
import debugFactory from "debug";

// local
import { ISerializable, ISerializableClass } from "../types/ISerializable";
import { IRedisService } from "./RedisService";
import { traceLogging } from "../util/traceLogging";

// set debugger
const debug = debugFactory("CacheService");

const redisKeepWarmListKey = "cache-keep-warm-items";

/**
 * cache serializable config interface
 */
export interface ICacheSerializableConfig<T> {
  serializableClass: ISerializableClass<T>;
  namespace: string;
  key: string;
  ttl: number | ((obj: T) => number);
  retrieveFunction: () => Promise<T>;
}

/**
 * cache json config interface
 */
export interface ICacheJsonConfig<T> {
  namespace: string;
  key: string;
  ttl: number | ((obj: T) => number);
  retrieveFunction: () => Promise<T>;
}

export type ICacheConfig<T> = {
  namespace: string; // used to group similar cached items (eg 'email_templates') - possible to purge all items within a namespace
  key: string; // used to identify a particular cached item within a namespace ('email_templates', 'password_reset')
  module: string; // the name of the module (in inversify) containing the function used to retrieve a value (eg. "CmsService")
  function: string; // the function used within the module used to retrieve a value (eg. "retrieveRawEmailTemplate")
  parameters: any[]; // params to pass to the function when calling for a raw value (eg. "password_reset")
  serializableClass?: ISerializableClass<T>; // optional: pass a class that will be used to serialise
  // / deserializee the value (required when caching non-json objects)

  ttl: number | ((obj: T) => number); // seconds to keep value in cache (or a function to compute this time)
} & (
  | {
      keepWarm: true; // if true, re-retrieve this item in the background to keep the value fresh
      coolDown: number; // (seconds) if item is not accessed within this time, stop keeping warm
    }
  | {
      keepWarm: false;
    }
);

/**
 * cache service interface
 */
export interface ICacheService {
  cache<T>(args: ICacheConfig<T>): Promise<T>;
  reheatCache(): Promise<void>; // call regularly to ensure the cache stays warm

  /**
   * @deprecated please use `cacheService.cache()` instead
   */
  cacheSerializable<T extends ISerializable>(
    args: ICacheSerializableConfig<T>,
  ): Promise<T>;

  /**
   * @deprecated please use `cacheService.cache()` instead
   */
  cacheJson<T>(args: ICacheJsonConfig<T>): Promise<T>;

  purgeNamespace(namespace: string): Promise<void>;

  deleteItem(namespace: string, key: string): Promise<void>;
}

/**
 * cache service
 */
@traceLogging("CacheService")
@injectable()
export class CacheService implements ICacheService {
  /**
   * constructor
   *
   * @param {IRedisService} _redisService
   * @param {Container} _sharedContainer
   */
  constructor(
    @inject("RedisService") protected _redisService: IRedisService,
    @inject("SharedContainer") protected _sharedContainer: Container,
  ) {}

  public async cache<T>(args: ICacheConfig<T>): Promise<T> {
    /*
    Redis cache data structure:
    - cache_${key}_value = cached serialised value (with TTL)
    - cache_${key}_keep_warm = if present, keep this value warm (stores args) (use TTL to auto expire)
    - cache-keep-warm-items = SET of keys to keep warm, iterated on each keep warm cron job
     */

    // try and fetch value from cache
    const cachedValue = await this.getItem(args.namespace, args.key, "value");
    if (cachedValue) {
      debug("Hit cache for %o %o", args.namespace, args.key);

      if (args.keepWarm) {
        // update keep_warm flag in redis (do this in the background)
        this.setItem(
          args.namespace,
          args.key,
          "keep_warm",
          args.coolDown,
          args,
        ).catch(console.error);
      }

      // if we have been given a serializableClass, use it to unserialize
      if (args.serializableClass) {
        return args.serializableClass.unserialize(cachedValue);
      }

      return cachedValue; // nothing available to unserialize with, return raw value
    }

    // item not found in cache
    // resolve & call retrieve function (`sharedContainer.get(“Ehr”)[“RetirevePatientByEhrId”].apply(paramters);`)
    debug("Hit disk/network for %o %o", args.namespace, args.key);
    const diskValue = await this.fetchDataForCacheConfig(args);

    // store value in cache (cache_${key}_value)
    // set cache_${key}_keep_warm
    const isCacheable =
      !!diskValue &&
      (!args.serializableClass ||
        (typeof diskValue === "object" &&
          typeof (diskValue as any).serialize === "function"));

    if (isCacheable) {
      const serializedValue = args.serializableClass
        ? (diskValue as any).serialize()
        : diskValue;

      // ttl can be a value or a function that returns a value (based on the object)
      const ttl = typeof args.ttl === "number" ? args.ttl : args.ttl(diskValue);

      await this.setItem(
        args.namespace,
        args.key,
        "value",
        ttl,
        serializedValue,
      );

      if (args.keepWarm) {
        debug(
          "Marking item for future keep-warm %o %o",
          args.namespace,
          args.key,
        );
        await this.setItem(
          args.namespace,
          args.key,
          "keep_warm",
          args.coolDown,
          args,
        ).catch(console.error);

        // add to keep warm set, will ensure the cron job monitors this item
        await this._redisService.setAddItem(
          redisKeepWarmListKey,
          `${args.namespace}_${args.key}`,
        );
      }
    }

    return diskValue;
  }

  // split out so sub-classes can override this behaviour
  protected async fetchDataForCacheConfig<T>(
    args: ICacheConfig<T>,
  ): Promise<T> {
    const retrieveModule: any = this._sharedContainer.get(args.module);
    const retrieveFunction: (...args: any) => Promise<T> =
      retrieveModule[args.function];

    const diskValue = await retrieveFunction.apply(
      retrieveModule,
      args.parameters,
    );

    return diskValue;
  }

  // called by cron in the background to keep things warm
  /*
    this._cronService.registerJob({
      name: "Cache keep warm",
      frequencyInMinutes: 1,
      funcToRun: () => this._cacheService.reheatCache()
    });
   */
  public async reheatCache(): Promise<void> {
    const keepWarmItems = await this._redisService.setListItems(
      redisKeepWarmListKey,
    );

    debug("reheatCache(): %o items to check for warmth", keepWarmItems.length);

    // check each item in parallel
    await Promise.all(
      keepWarmItems.map(async (keepWarmItemKey) => {
        const args = await this._redisService.getItem(
          `cache_${keepWarmItemKey}_keep_warm`,
        );
        if (args === null) {
          // the keep warm has expired, remove from the keep warm list & abort
          debug(
            "Keep warm expired, removing from check list %o",
            redisKeepWarmListKey,
          );
          await this._redisService.setRemoveItem(
            redisKeepWarmListKey,
            keepWarmItemKey,
          );
          return;
        }

        const timeTillValueExpiry = await this._redisService.getItemTtl(
          `cache_${keepWarmItemKey}_value`,
        );

        // refresh if the item has less than 2 min to live or has been removed
        const shouldRefreshValue = timeTillValueExpiry < 60 * 2;
        if (shouldRefreshValue) {
          debug("Item close to expiry, re-fetching %o", keepWarmItemKey);
          // ---------------------------------------------------------------------------------------
          // refetch the value from the disk / server and update the cache
          const diskValue = await this.fetchDataForCacheConfig(args);

          // store value in cache (cache_${key}_value)
          // set cache_${key}_keep_warm
          const isCachable =
            !!diskValue &&
            (!args.serializableClass ||
              (typeof diskValue === "object" &&
                typeof (diskValue as any).serialize === "function"));

          if (isCachable) {
            const serializedValue = args.serializableClass
              ? (diskValue as any).serialize()
              : diskValue;

            // ttl can be a value or a function that returns a value (based on the object)
            const ttl =
              typeof args.ttl === "number" ? args.ttl : args.ttl(diskValue);

            await this.setItem(
              args.namespace,
              args.key,
              "value",
              ttl,
              serializedValue,
            );
          }
          // ---------------------------------------------------------------------------------------
        }
      }),
    );
  }

  /**
   * takes an ISerializable class and function to retrieve, caches value
   * @deprecated please use `cacheService.cache()` instead
   * @param {ICacheSerializableConfig<T extends ISerializable>} args
   * @returns {Promise<T extends ISerializable>}
   */
  public async cacheSerializable<T extends ISerializable>(
    args: ICacheSerializableConfig<T>,
  ): Promise<T> {
    const cachedValue = await this.getItem(args.namespace, args.key, "value");
    if (cachedValue) {
      debug("cacheSerializable hit cache for %o %o", args.namespace, args.key);
      return args.serializableClass.unserialize(cachedValue);
    }

    debug("cacheSerializable hit disk for %o %o", args.namespace, args.key);
    const diskValue = await args.retrieveFunction();

    if (
      // only cache if retrieveFunction returned a seralizeable obj
      typeof diskValue === "object" &&
      diskValue !== null &&
      typeof diskValue.serialize === "function"
    ) {
      // cache disk value
      const serializedValue = diskValue.serialize();

      // ttl can be a value or a function that returns a value (based on the object)
      const ttl = typeof args.ttl === "number" ? args.ttl : args.ttl(diskValue);
      await this.setItem(
        args.namespace,
        args.key,
        "value",
        ttl,
        serializedValue,
      );
    }

    return diskValue;
  }

  /**
   * takes json object and function to retrieve, caches value
   * @deprecated please use `cacheService.cache()` instead
   * @param {ICacheJsonConfig<T>} args
   * @returns {Promise<T>}
   */
  public async cacheJson<T>(args: ICacheJsonConfig<T>): Promise<T> {
    const cachedValue = await this.getItem(args.namespace, args.key, "value");
    if (cachedValue) {
      debug("cacheJson hit cache for %o %o", args.namespace, args.key);
      return cachedValue;
    }

    debug("cacheJson hit disk for %o %o", args.namespace, args.key);
    const diskValue = await args.retrieveFunction();

    if (
      // only cache if retrieveFunction returned a json obj
      typeof diskValue === "object" &&
      diskValue !== null
    ) {
      // cache disk value

      // ttl can be a value or a function that returns a value (based on the object)
      const ttl = typeof args.ttl === "number" ? args.ttl : args.ttl(diskValue);
      await this.setItem(args.namespace, args.key, "value", ttl, diskValue);
    }

    return diskValue;
  }

  /**
   * get item from cache
   *
   * @param {string} namespace
   * @param {string} key
   * @param {string} property
   * @returns {Promise<any | null>}
   */
  public async getItem(
    namespace: string,
    key: string,
    property: "value" | "keep_warm",
  ): Promise<any | null> {
    const retVal = await this._redisService.getItem(
      this._getRedisKey(namespace, key, property),
    );
    return retVal;
  }

  /**
   * add item to cache
   *
   * @param {string} namespace
   * @param {string} key
   * @param {string} property
   * @param {number} ttl
   * @param value
   * @returns {Promise<void>}
   */
  private async setItem(
    namespace: string,
    key: string,
    property: "value" | "keep_warm",
    ttl: number,
    value: any,
  ): Promise<void> {
    return this._redisService.setItem(
      this._getRedisKey(namespace, key, property),
      value,
      ttl,
    );
  }

  /**
   * delete item from cache
   *
   * @param {string} namespace
   * @param {string} key
   * @returns {Promise<void>}
   */
  public async deleteItem(namespace: string, key: string): Promise<void> {
    await Promise.all([
      this._redisService.deleteItem(this._getRedisKey(namespace, key, "value")),
      this._redisService.deleteItem(
        this._getRedisKey(namespace, key, "keep_warm"),
      ),
    ]);
  }

  /**
   * purge namespace
   *
   * @param {string} namespace
   * @returns {Promise<void>}
   */
  public async purgeNamespace(namespace: string): Promise<void> {
    const keys = await this._redisService.getKeysStartingWith(
      `cache_${namespace}_`,
    );
    await Promise.all(keys.map((key) => this._redisService.deleteItem(key)));
  }

  /**
   * retrieve redis key
   *
   * @param {string} namespace
   * @param {string} key
   * @param {string } property - used to provide metadata to objects
   * @returns {string}
   */
  private _getRedisKey(
    namespace: string,
    key: string,
    property: "value" | "keep_warm",
  ) {
    return `cache_${namespace}_${key}_${property}`;
  }
}
