import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { companies } from "../../db/schema/index";

export const insertCompanySchema = createInsertSchema(companies, {
  name: t.String(),
  document: t.String({ minLength: 11, maxLength: 14 }),
  phone: t.String({ minLength: 8 }),
  website: t.String({ format: "uri" }),
});
export const updateCompanySchema = t.Partial(insertCompanySchema);
export const selectCompanySchema = createSelectSchema(companies);
