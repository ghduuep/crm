import {
  integer,
  pgTable,
  pgEnum,
  varchar,
  timestamp,
  decimal,
  date,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";
import { createId } from "@paralleldrive/cuid2";

export const rolesEnum = pgEnum("role", ["admin", "sales", "manager"]);

export const users = pgTable("users", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name"),
  email: varchar("email").notNull().unique(),
  password: varchar("password").notNull(),
  role: rolesEnum(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users, {
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

export const updateUserRoleSchema = t.Object({
  role: t.UnionEnum(rolesEnum.enumValues),
});

export const updateUserProfileSchema = t.Object({
  name: t.String(),
  email: t.String({ format: "email" }),
  password: t.String({ minLength: 8 }),
});

export const updateUserSchema = t.Partial(insertUserSchema);
export const selectUserSchema = t.Omit(createSelectSchema(users) as any, [
  "password",
]);
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

export const insertActivitySchema = createInsertSchema(activities, {
  leadId: t.String(),
  contactId: t.String(),
  userId: t.String(),
  type: t.UnionEnum(typeEnum.enumValues),
  description: t.String(),
  activity_date: t.Date(),
});
export const updateActivitySchema = t.Partial(insertActivitySchema);
export const selectActivitySchema = createSelectSchema(activities);

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

export const insertTaskSchema = createInsertSchema(tasks, {
  leadId: t.String(),
  contactId: t.String(),
  assignedTo: t.String(),
  title: t.String(),
  description: t.String(),
  dueDate: t.Date(),
  status: t.UnionEnum(taskStatusEnum.enumValues),
});
export const updateTaskSchema = t.Partial(insertTaskSchema);
export const selectTaskSchema = createSelectSchema(tasks);

export const pipelineStages = pgTable("pipeline_stages", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name").notNull(),
  position: integer("position").notNull(),
});

export const insertPipelineStageSchema = createInsertSchema(pipelineStages, {
  name: t.String(),
  position: t.Integer({ minimum: 0 }),
});
export const updatePipelineStageSchema = t.Partial(insertPipelineStageSchema);
export const selectPipelineStageSchema = createSelectSchema(pipelineStages);

export const tags = pgTable("tags", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name").notNull(),
});

export const insertTagSchema = createInsertSchema(tags, {
  name: t.String(),
});
export const updateTagSchema = t.Partial(insertTagSchema);
export const selectTagSchema = createSelectSchema(tags);

export const entityTypeEnum = pgEnum("entity_type", [
  "lead",
  "contact",
  "company",
]);

export const entityTags = pgTable("entity_tags", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  tagId: varchar("tag_id").references(() => tags.id),
  entityType: entityTypeEnum(),
  entityId: varchar("entity_id").notNull(),
});

export const insertEntityTagSchema = createInsertSchema(entityTags, {
  tagId: t.String(),
  entityType: t.UnionEnum(entityTypeEnum.enumValues),
  entityId: t.String(),
});
export const updateEntityTagSchema = t.Partial(insertEntityTagSchema);
export const selectEntityTagSchema = createSelectSchema(entityTags);

export const tables = {
  users,
  companies,
  contacts,
  leads,
  activities,
  tasks,
  pipelineStages,
  tags,
  entityTags,
} as const;

export type Tables = typeof tables;
