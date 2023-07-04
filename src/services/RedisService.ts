/**
 * imports
 */

// external
import { promisify } from "util";
import { inject, injectable } from "inversify";
import { RedisClient, createClient } from "redis";
import debugFactory from "debug";

// local
import { traceLogging } from "../util/traceLogging";
import { IConfig } from "../IoC/config";

// debugger
const debug = debugFactory("RedisService");

/**
 * redis service interface
 */
export interface IRedisService {
  redisClient: RedisClient;
  prefix: string;

  getItem(key: string): Promise<any | null>;

  setItem(key: string, value: any, ttl?: number): Promise<void>;

  getItemTtl(key: string): Promise<number>;

  deleteItem(key: string): Promise<number>; // returns number of items deleted

  setAddItem(key: string, value: string): Promise<number>; // returns 1 if item was added, 0 if already in set
  setRemoveItem(key: string, value: string): Promise<number>; // returns 1 if item was removed, 0 if not in set
  setListItems(key: string): Promise<string[]>;

  evalLua(script: string, args: string[]): Promise<any>;

  getKeysStartingWith(prefix: string): Promise<string[]>;

  purge(): Promise<string>; // returns 'OK' if operation was successful
}

@traceLogging("RedisService")
@injectable()
export class RedisService implements IRedisService {
  // create redis instance
  public readonly redisClient: RedisClient = null;
  public readonly prefix: string = "";

  // redis promise functions
  // pre-promisify to avoid running this on every call
  private readonly redisGet: any;
  private readonly redisSet: any;
  private readonly redisKeys: any;

  // returns -1 if item has no ttl, -2 if item does not exist
  public getItemTtl: any;
  public deleteItem: any;
  public setAddItem: any;
  public setRemoveItem: any;
  public setListItems: any;
  public purge: any;

  /**
   * constructor
   *
   * @param {IConfig} _config
   */
  constructor(@inject("config") private _config: IConfig) {
    this.prefix = this._config.redisNamespace
      ? this._config.redisNamespace + ":"
      : "";

    const redisClientConfig = {
      // only provide a prefix if it is not an empty string
      prefix: this.prefix,

      // only pass TLS placeholder config if the env is to use a Redis server with encryption in-transit enabled
      tls: this._config.redisTls ? {} : undefined,
    };

    this.redisClient = createClient(this._config.redisUrl, redisClientConfig);

    this.redisGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.redisSet = promisify(this.redisClient.set).bind(this.redisClient);
    this.redisKeys = promisify(this.redisClient.keys).bind(this.redisClient);

    // returns -1 if item has no ttl, -2 if item does not exist
    this.getItemTtl = promisify(this.redisClient.ttl).bind(this.redisClient);

    this.deleteItem = promisify(this.redisClient.del).bind(this.redisClient);

    this.setAddItem = promisify(this.redisClient.sadd).bind(this.redisClient);

    this.setRemoveItem = promisify(this.redisClient.srem).bind(
      this.redisClient,
    );

    this.setListItems = promisify(this.redisClient.smembers).bind(
      this.redisClient,
    );
    this.purge = promisify(this.redisClient.flushall).bind(this.redisClient);
  }

  /**
   * retrieve item from cache
   *
   * @param {string} key
   * @returns {Promise<any | null>}
   */

  public async getItem(key: string): Promise<any | null> {
    const strVal = await this.redisGet(key);

    const value = JSON.parse(strVal);
    debug("getItem(%o): %o", key, value);
    return value;
  }

  /**
   * set item in cache
   *
   * @param {string} key
   * @param value
   * @param {number} ttl
   * @returns {Promise<void>}
   */
  public async setItem(key: string, value: any, ttl?: number): Promise<void> {
    // stringify value
    const strVal = JSON.stringify(value);

    // set item with ttl
    if (ttl !== undefined) {
      debug("setItem(%o, %o, %o)", key, value, ttl);
      await (this.redisSet as any)(key, strVal, "EX", ttl); // promisfy typings dont handle dynamic arguments well
      return;
    }

    // set item
    debug("setItem(%o, %o)", key, value);
    await this.redisClient.set(key, strVal);
  }

  public async evalLua(script: string, args: string[]): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.redisClient.eval(
        script,
        args.length,
        ...args,
        (err: any, res: any) => {
          if (err) {
            return reject(err);
          }
          resolve(res);
        },
      ),
    );
  }

  /**
   * find items in cache starting with prefix
   *
   * @param {string} prefix
   * @returns {Promise<string[]>}
   */
  public async getKeysStartingWith(prefix: string): Promise<string[]> {
    // find items with key prefix
    if (this._config.redisNamespace === "") {
      // no namespace, execute directly
      return await this.redisKeys(`${prefix}*`);
    }

    const keysWithNamespace: string[] = await this.redisKeys(
      `${this._config.redisNamespace}:${prefix}*`,
    );
    const prefixLength = this._config.redisNamespace.length + 1; // namespace + ":"

    // strip namespace off start of key
    const keys = keysWithNamespace.map((keyWithNamespace) =>
      keyWithNamespace.substring(prefixLength),
    );
    return keys;
  }
}
