import { t } from "elysia";
import {
  insertCompanySchema,
  updateCompanySchema,
  selectCompanySchema,
  selectContactSchema,
} from "../shared/base-schemas";

export const selectCompanyNestedSchema = t.Composite([
  selectCompanySchema,
  t.Object({ contacts: t.Array(selectContactSchema) }),
]);

export { insertCompanySchema, updateCompanySchema, selectCompanySchema };
