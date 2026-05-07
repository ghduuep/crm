import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {
  date,
  decimal,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { contacts } from "./contacts";
import { pipelineStages } from "./pipeline-stages";
import { users } from "./users";

export const leadStatusEnum = pgEnum("lead_status", ["open", "won", "lost"]);

export const leads = pgTable("leads", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: varchar("title").notNull(),
  companyId: varchar("company_id").references(() => companies.id),
  contactId: varchar("contact_id").references(() => contacts.id),
  ownerId: varchar("owner_id")
    .references(() => users.id)
    .notNull(),
  status: leadStatusEnum(),
  stageId: varchar("stage_id").references(() => pipelineStages.id),
  value: decimal("value", { precision: 10, scale: 2 }),
  probability: integer("probability").default(0),
  expectedCloseDate: date("expected_close_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const insertLeadSchema = createInsertSchema(leads, {
  title: t.String(),
  companyId: t.String(),
  contactId: t.String(),
  ownerId: t.String(),
  status: t.UnionEnum(leadStatusEnum.enumValues),
  stageId: t.String(),
  value: t.String(),
  expectedCloseDate: t.String(),
});
export const updateLeadSchema = t.Partial(insertLeadSchema);
export const selectLeadSchema = createSelectSchema(leads);
