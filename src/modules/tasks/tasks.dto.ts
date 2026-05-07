import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { tasks, taskStatusEnum } from "../../db/schema/index";

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
