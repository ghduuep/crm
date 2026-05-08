import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import {
  activities,
  companies,
  contacts,
  entityTags,
  leads,
  pipelineStages,
  users,
  tasks,
  tags,
  typeEnum,
  positionEnum,
  entityTypeEnum,
  leadStatusEnum,
  rolesEnum,
  taskStatusEnum,
} from "../../db/schema/index";

// ACTIVITIES

export const insertActivitySchema = createInsertSchema(activities, {
  leadId: t.Nullable(t.String()),
  contactId: t.Nullable(t.String()),
  userId: t.Nullable(t.String()),
  type: t.Nullable(t.UnionEnum(typeEnum.enumValues)),
  description: t.Nullable(t.String()),
  activity_date: t.Nullable(t.Date()),
});
export const updateActivitySchema = t.Partial(insertActivitySchema);

export const selectActivitySchema = createSelectSchema(activities);

// COMPANIES

export const insertCompanySchema = createInsertSchema(companies, {
  name: t.String(),
  document: t.Nullable(t.String({ minLength: 11, maxLength: 14 })),
  phone: t.Nullable(t.String({ minLength: 8 })),
  website: t.Nullable(t.String({ format: "uri" })),
});
export const updateCompanySchema = t.Partial(insertCompanySchema);
export const selectCompanySchema = createSelectSchema(companies);

// CONTACTS

export const insertContactSchema = createInsertSchema(contacts, {
  companyId: t.Nullable(t.String()),
  name: t.Nullable(t.String()),
  email: t.Nullable(t.String({ format: "email" })),
  phone: t.Nullable(t.String({ minLength: 8 })),
  position: t.Nullable(t.UnionEnum(positionEnum.enumValues)),
});
export const updateContactSchema = t.Partial(insertContactSchema);
export const selectContactSchema = createSelectSchema(contacts);

// ENTITY TAGS

export const insertEntityTagSchema = createInsertSchema(entityTags, {
  tagId: t.Nullable(t.String()),
  entityType: t.Nullable(t.UnionEnum(entityTypeEnum.enumValues)),
  entityId: t.String(),
});
export const updateEntityTagSchema = t.Partial(insertEntityTagSchema);
export const selectEntityTagSchema = createSelectSchema(entityTags);

// LEADS

export const insertLeadSchema = createInsertSchema(leads, {
  title: t.String(),
  companyId: t.Nullable(t.String()),
  contactId: t.Nullable(t.String()),
  ownerId: t.String(),
  status: t.Nullable(t.UnionEnum(leadStatusEnum.enumValues)),
  stageId: t.Nullable(t.String()),
  value: t.Nullable(t.String()),
  expectedCloseDate: t.Nullable(t.String()),
});
export const updateLeadSchema = t.Partial(insertLeadSchema);

export const selectLeadSchema = createSelectSchema(leads);

// PIPELINE STAGES

export const insertPipelineStageSchema = createInsertSchema(pipelineStages, {
  name: t.String(),
  position: t.Integer({ minimum: 0 }),
});
export const updatePipelineStageSchema = t.Partial(insertPipelineStageSchema);
export const selectPipelineStageSchema = createSelectSchema(pipelineStages);

// TAGS

export const insertTagSchema = createInsertSchema(tags, {
  name: t.String(),
});
export const updateTagSchema = t.Partial(insertTagSchema);
export const selectTagSchema = createSelectSchema(tags);

// TASKS

export const insertTaskSchema = createInsertSchema(tasks, {
  leadId: t.Nullable(t.String()),
  contactId: t.Nullable(t.String()),
  assignedTo: t.Nullable(t.String()),
  title: t.String(),
  description: t.Nullable(t.String()),
  dueDate: t.Nullable(t.Date()),
  status: t.Nullable(t.UnionEnum(taskStatusEnum.enumValues)),
});
export const updateTaskSchema = t.Partial(insertTaskSchema);
export const selectTaskSchema = createSelectSchema(tasks);

// USERS

export const insertUserSchema = createInsertSchema(users, {
  name: t.Nullable(t.String()),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
  role: t.Nullable(t.UnionEnum(rolesEnum.enumValues)),
});

export const updateUserRoleSchema = t.Object({
  role: t.Nullable(t.UnionEnum(rolesEnum.enumValues)),
});

export const updateUserProfileSchema = t.Object({
  name: t.Nullable(t.String()),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
});

export const updateUserSchema = t.Partial(insertUserSchema);
export const selectUserSchema = t.Omit(createSelectSchema(users) as any, [
  "password",
]);
