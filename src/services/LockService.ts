import { inject, injectable } from "inversify";

import { traceLogging } from "../util/traceLogging";
import { IRedisService } from "./RedisService";
import { IIPCService } from "./IPCService";

export interface ILockService {
  lock<T>(keys: string | string[], func: () => Promise<T>): Promise<T>;
}

const lockedItemsSetKey = "LOCK_SERVICE_LOCKS_";
const releaseIPCEventPrefix = "LOCK_SERVICE_ITEM_RELEASED_";

@traceLogging("LockService")
@injectable()
export class LockService implements ILockService {
  constructor(
    @inject("RedisService") private _redisService: IRedisService,
    @inject("IPCService") private _ipcService: IIPCService,
  ) {}

  public async lock<T>(
    keysOrKey: string | string[],
    func: () => Promise<T>,
  ): Promise<T> {
    const keys = Array.isArray(keysOrKey) ? keysOrKey : [keysOrKey];

    const execFuncAndReleaseLock = async (): Promise<T> => {
      let retVal: any;
      try {
        retVal = await func();
      } catch (e) {
        await this.releaseLock(keys);
        throw e;
      }

      await this.releaseLock(keys);
      return retVal;
    };

    if (await this.acquireLock(keys)) {
      return await execFuncAndReleaseLock();
    }

    // someone else has one of the locks, wait for a key we are locked on to be released and try again
    return new Promise<T>((resolve, reject) => {
      const onRelease = () => {
        (async () => {
          if (!(await this.acquireLock(keys))) {
            return; // failed to acquire a lock, might be more keys still locked
          }

          // stop listening to releases
          keys.forEach((key) =>
            this._ipcService.broadcast.off(
              releaseIPCEventPrefix + key,
              onRelease,
            ),
          );

          resolve(await execFuncAndReleaseLock());
        })().catch(reject);
      };

      // listen for release events on any relevant keys
      keys.forEach((key) =>
        this._ipcService.broadcast.on(releaseIPCEventPrefix + key, onRelease),
      );
    });
  }

  private async acquireLock(keys: string[]): Promise<boolean> {
    // new version with lua
    const lockLuaScript = `
    for i, k in ipairs(KEYS) do
      if redis.call('EXISTS', k) == 1 then
        return 0
      end
    end

    for i, k in ipairs(KEYS) do
      redis.call('SET', k, 'locked', 'EX', 30)
    end

    return 1
    `;

    const prefixedKeys = keys.map((key) => lockedItemsSetKey + key);

    const res = await this._redisService.evalLua(lockLuaScript, prefixedKeys);
    return res === 1;
  }

  private async releaseLock(keys: string[]) {
    // release locks
    await Promise.all(
      keys.map((key) => this._redisService.deleteItem(lockedItemsSetKey + key)),
    );

    // trigger listeners (new)
    await Promise.all(
      keys.map((key) =>
        this._ipcService.broadcast.emit(releaseIPCEventPrefix + key),
      ),
    );
  }
}

// ${this._redisService.prefix}${lockedItemsSetKey}dev:Patient/MD28786
