import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { companies } from "../../db/schema/index";
import { selectContactSchema } from "../contacts/contacts.dto";

export const insertCompanySchema = createInsertSchema(companies, {
  name: t.String(),
  document: t.Nullable(t.String({ minLength: 11, maxLength: 14 })),
  phone: t.Nullable(t.String({ minLength: 8 })),
  website: t.Nullable(t.String({ format: "uri" })),
});
export const updateCompanySchema = t.Partial(insertCompanySchema);
export const selectCompanySchema = createSelectSchema(companies);

export const selectCompanyNestedSchema = t.Composite([
  selectCompanySchema,
  t.Object({ contacts: t.Array(selectContactSchema) }),
]);
