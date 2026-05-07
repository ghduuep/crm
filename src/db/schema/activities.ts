import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { contacts } from "./contacts";
import { leads } from "./leads";
import { users } from "./users";

export const typeEnum = pgEnum("activity_type", [
  "call",
  "email",
  "meeting",
  "note",
  "whatsapp",
]);

export const activities = pgTable("activities", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  leadId: varchar("lead_id").references(() => leads.id),
  contactId: varchar("contact_id").references(() => contacts.id),
  userId: varchar("user_id").references(() => users.id),
  type: typeEnum(),
  description: text("description"),
  activity_date: timestamp("activity_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
