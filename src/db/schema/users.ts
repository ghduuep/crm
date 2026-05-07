import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("role", ["admin", "sales", "manager"]);

export const users = pgTable("users", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: rolesEnum().default("sales"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users, {
  email: t.String({ format: "email" }),
});

export const updateUserRoleSchema = t.Object({
  role: t.UnionEnum(rolesEnum.enumValues),
});

export const updateUserProfileSchema = t.Object({
  name: t.String(),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.String(),
});

export const updateUserSchema = t.Partial(insertUserSchema);
export const selectUserSchema = t.Omit(createSelectSchema(users) as any, [
  "password",
]);
