import { relations } from "drizzle-orm";
import { accounts } from "./accounts";
import { activities } from "./activities";
import { companies } from "./companies";
import { contacts } from "./contacts";
import { entityTags } from "./entity-tags";
import { leads } from "./leads";
import { pipelineStages } from "./pipeline-stages";
import { sessions } from "./sessions";
import { tags } from "./tags";
import { tasks } from "./tasks";
import { users } from "./users";

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  leads: many(leads),
  tasks: many(tasks),
}));

export const companiesRelations = relations(companies, ({ many }) => ({
  contacts: many(contacts),
  leads: many(leads),
  tags: many(entityTags, {
    relationName: "company_tags",
  }),
}));

export const contactsRelations = relations(contacts, ({ one, many }) => ({
  company: one(companies, {
    fields: [contacts.companyId],
    references: [companies.id],
  }),

  leads: many(leads),
  tags: many(entityTags, {
    relationName: "contact_tags",
  }),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  company: one(companies, {
    fields: [leads.companyId],
    references: [companies.id],
  }),
  contact: one(contacts, {
    fields: [leads.contactId],
    references: [contacts.id],
  }),
  owner: one(users, {
    fields: [leads.ownerId],
    references: [users.id],
  }),
  stage: one(pipelineStages, {
    fields: [leads.stageId],
    references: [pipelineStages.id],
  }),

  activities: many(activities),
  tasks: many(tasks),
  tags: many(entityTags, {
    relationName: "lead_tags",
  }),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  lead: one(leads, {
    fields: [activities.leadId],
    references: [leads.id],
  }),
  contact: one(contacts, {
    fields: [activities.contactId],
    references: [contacts.id],
  }),
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  lead: one(leads, {
    fields: [tasks.leadId],
    references: [leads.id],
  }),
  contact: one(contacts, {
    fields: [tasks.contactId],
    references: [contacts.id],
  }),
  assignedTo: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id],
  }),
}));

export const pipelineStageRelations = relations(pipelineStages, ({ many }) => ({
  leads: many(leads),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  entityTags: many(entityTags),
}));

export const entityTagsRelations = relations(entityTags, ({ one }) => ({
  tag: one(tags, {
    fields: [entityTags.tagId],
    references: [tags.id],
  }),
  lead: one(leads, {
    fields: [entityTags.entityId],
    references: [leads.id],
    relationName: "lead_tags",
  }),
  contact: one(contacts, {
    fields: [entityTags.entityId],
    references: [contacts.id],
    relationName: "contact_tags",
  }),
  company: one(companies, {
    fields: [entityTags.entityId],
    references: [companies.id],
    relationName: "company_tags",
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  users: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
