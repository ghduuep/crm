import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import { accounts, sessions, users, verifications } from "../db/schema/index";

export const auth = betterAuth({
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
    disableSignUp: true,
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
});
