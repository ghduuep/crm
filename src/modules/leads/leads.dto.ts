import { t } from "elysia";
import {
  insertLeadSchema,
  updateLeadSchema,
  selectLeadSchema,
  selectCompanySchema,
  selectContactSchema,
  selectPipelineStageSchema,
  selectActivitySchema,
  selectEntityTagSchema,
  selectUserSchema,
  selectTaskSchema,
  selectTagSchema,
} from "../shared/base-schemas";

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

export { insertLeadSchema, updateLeadSchema, selectLeadSchema };
