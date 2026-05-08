import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { activities, typeEnum } from "../../db/schema/index";
import { selectUserSchema } from "../users/users.dto";
import { selectLeadSchema } from "../leads/leads.dto";
import { selectContactSchema } from "../contacts/contacts.dto";

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

export const selectActivityNestedSchema = t.Composite([
  selectActivitySchema,
  t.Object({
    lead: t.Nullable(selectLeadSchema),
    contact: t.Nullable(selectContactSchema),
    user: t.Nullable(selectUserSchema),
  }),
]);
