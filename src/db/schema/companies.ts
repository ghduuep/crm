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

export const insertCompanySchema = createInsertSchema(companies, {
  name: t.String(),
  document: t.String({ minLength: 11, maxLength: 14 }),
  phone: t.String({ minLength: 8 }),
  website: t.String({ format: "uri" }),
});
export const updateCompanySchema = t.Partial(insertCompanySchema);
export const selectCompanySchema = createSelectSchema(companies);
