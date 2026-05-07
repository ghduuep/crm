import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { contacts } from "./contacts";
import { leads } from "./leads";
import { users } from "./users";

export const taskStatusEnum = pgEnum("task_status", [
  "pending",
  "in_progress",
  "done",
  "canceled",
]);

export const tasks = pgTable("tasks", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  leadId: varchar("lead_id").references(() => leads.id),
  contactId: varchar("contact_id").references(() => contacts.id),
  assignedTo: varchar("assigned_to").references(() => users.id),
  title: varchar("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  status: taskStatusEnum(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

