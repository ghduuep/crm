import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { leads, leadStatusEnum } from "../../db/schema/index";

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
