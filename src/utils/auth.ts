import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import { accounts, sessions, users, verifications } from "../db/schema/index";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac } from "./permissions";
import { roles } from "./permissions";
import { redis } from "../db/redis";

export const auth = betterAuth({
  plugins: [
    adminPlugin({
      ac,
      roles: roles,
      defaultRole: "sales",
    }),
  ],
  rateLimit: {
    window: 10,
    max: 100,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users: users,
      accounts: accounts,
      sessions: sessions,
      verifications: verifications,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "sales",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
  trustedOrigins: ["http://localhost:3000"],
  secondaryStorage: {
    get: async (key: string) => {
      return await redis.get(key);
    },
    set: async (key: string, value: string, ttl?: number) => {
      await redis.set(key, value);

      if (ttl) {
        await redis.expire(key, ttl);
      }
    },
    delete: async (key: string) => {
      await redis.del(key);
    },
  }
});
