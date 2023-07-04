export interface IRedisServiceConfig {
  redisUrl: string;
  /**
   * namespace is used to group the redis keys
   */
  redisNamespace: string;
  redisTls: boolean;
}

export const RedisServiceStringEnvKeys = ["REDIS_URL", "REDIS_NAMESPACE"];

export const RedisServiceBooleanEnvKeys = ["REDIS_TLS"];
