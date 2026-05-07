import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const companies = pgTable("companies", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name").notNull(),
  document: varchar("document").unique(),
  phone: varchar("phone"),
  website: varchar("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
