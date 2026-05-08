import { t } from "elysia";
import {
  insertContactSchema,
  updateContactSchema,
  selectContactSchema,
  selectCompanySchema,
} from "../shared/base-schemas";

export const selectContactNestedSchema = t.Composite([
  selectContactSchema,
  t.Object({ company: t.Nullable(selectCompanySchema) }),
]);

export { insertContactSchema, updateContactSchema, selectContactSchema };
