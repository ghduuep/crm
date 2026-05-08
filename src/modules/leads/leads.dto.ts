import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { leads, leadStatusEnum } from "../../db/schema/index";
import { selectUserSchema } from "../users/users.dto";
import { selectCompanySchema } from "../companies/companies.dto";
import { selectContactSchema } from "../contacts/contacts.dto";
import { selectPipelineStageSchema } from "../pipeline-stages/pipeline-stages.dto";
import { selectActivitySchema } from "../activities/activities.dto";
import { selectTaskSchema } from "../tasks/tasks.dto";
import { selectEntityTagSchema } from "../entity-tags/entity-tags.dto";
import { selectTagSchema } from "../tags/tags.dto";

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

export const selectLeadListNestedSchema = t.Composite([
  selectLeadSchema,
  t.Object({
    company: t.Nullable(selectCompanySchema),
    contact: t.Nullable(selectContactSchema),
    owner: selectUserSchema,
    stage: t.Nullable(selectPipelineStageSchema),
  }),
]);

export const selectLeadNestedSchema = t.Composite([
  selectLeadSchema,
  t.Object({
    company: t.Nullable(selectCompanySchema),
    contact: t.Nullable(selectContactSchema),
    owner: selectUserSchema,
    stage: t.Nullable(selectPipelineStageSchema),
    activities: t.Array(selectActivitySchema),
    tasks: t.Array(selectTaskSchema),
    tags: t.Array(
      t.Composite([
        selectEntityTagSchema,
        t.Object({ tag: t.Nullable(selectTagSchema) }),
      ]),
    ),
  }),
]);
