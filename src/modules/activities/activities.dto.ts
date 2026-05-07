import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { activities, typeEnum } from "../../db/schema/index";

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
