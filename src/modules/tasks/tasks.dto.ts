import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { tasks, taskStatusEnum } from "../../db/schema/index";
import { selectLeadSchema } from "../leads/leads.dto";
import { selectContactSchema } from "../contacts/contacts.dto";
import { selectUserSchema } from "../users/users.dto";

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

export const selectTaskNestedSchema = t.Composite([
  selectTaskSchema,
  t.Object({
    lead: t.Nullable(selectLeadSchema),
    contact: t.Nullable(selectContactSchema),
    assignedTo: t.Nullable(selectUserSchema),
  }),
]);
