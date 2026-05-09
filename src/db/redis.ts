import { RedisClient } from "bun";
import { env } from "bun";

const redisUrl = `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`;

export const redis = new RedisClient(redisUrl);
