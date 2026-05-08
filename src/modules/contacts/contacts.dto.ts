import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { contacts, positionEnum } from "../../db/schema/index";
import { selectCompanySchema } from "../companies/companies.dto";

export const insertContactSchema = createInsertSchema(contacts, {
  companyId: t.Nullable(t.String()),
  name: t.Nullable(t.String()),
  email: t.Nullable(t.String({ format: "email" })),
  phone: t.Nullable(t.String({ minLength: 8 })),
  position: t.Nullable(t.UnionEnum(positionEnum.enumValues)),
});
export const updateContactSchema = t.Partial(insertContactSchema);
export const selectContactSchema = createSelectSchema(contacts);

export const selectContactNestedSchema = t.Composite([
  selectContactSchema,
  t.Object({ company: t.Nullable(selectCompanySchema) }),
]);
