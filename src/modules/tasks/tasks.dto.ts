import { t } from "elysia";
import {
  insertTaskSchema,
  updateTaskSchema,
  selectTaskSchema,
  selectLeadSchema,
  selectContactSchema,
  selectUserSchema,
} from "../shared/base-schemas";

export const selectTaskNestedSchema = t.Composite([
  selectTaskSchema,
  t.Object({
    lead: t.Nullable(selectLeadSchema),
    contact: t.Nullable(selectContactSchema),
    assignedTo: t.Nullable(selectUserSchema),
  }),
]);

export { insertTaskSchema, updateTaskSchema, selectTaskSchema };
