/**
 * This isn't directly used by any specific service,
 * but used by the services that uses the CacheService
 */
export interface ICacheConfig {
  /**
   * "time to live" - the time for the cache value
   * to last for in the Redis service
   */
  cacheTtl: number;
  /**
   * a "shorter time to live" as above.
   */
  shortCacheTtl: number;
  /**
   * this is used in tandem with the
   * "warmCache" arg when using the CacheService.
   * this is how long the warm cache should be warming for.
   */
  cacheCoolDown: number;
}

export const CacheConfigNumberEnvKeys = [
  "CACHE_TTL",
  "SHORT_CACHE_TTL",
  "CACHE_COOL_DOWN",
];
