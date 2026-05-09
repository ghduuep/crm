import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/index";
import { upstashCache } from "drizzle-orm/cache/upstash";
import { env } from "bun";

export const db = drizzle(env.DATABASE_URL!, {
  cache: upstashCache({
    url: env.UPSTASH_URL!,
    token: env.UPSTASH_TOKEN!,
    global: true,
  }),
  schema: { ...schema },
  casing: "camelCase",
});
