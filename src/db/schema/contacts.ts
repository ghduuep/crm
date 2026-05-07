import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { companies } from "./companies";

export const positionEnum = pgEnum("position", [
  "ceo",
  "cto",
  "manager",
  "sales",
  "marketing",
  "other",
]);

export const contacts = pgTable("contacts", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  companyId: varchar("company_id").references(() => companies.id),
  name: varchar("name"),
  email: varchar("email"),
  phone: varchar("phone"),
  position: positionEnum(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const insertContactSchema = createInsertSchema(contacts, {
  companyId: t.String(),
  name: t.String(),
  email: t.String({ format: "email" }),
  phone: t.String({ minLength: 8 }),
  position: t.UnionEnum(positionEnum.enumValues),
});
export const updateContactSchema = t.Partial(insertContactSchema);
export const selectContactSchema = createSelectSchema(contacts);
