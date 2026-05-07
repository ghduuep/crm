import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import * as authSchema from "../utils/auth-schema";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: { ...schema, ...authSchema },
});
