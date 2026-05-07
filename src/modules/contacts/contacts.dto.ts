import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { contacts, positionEnum } from "../../db/schema/index";

export const insertContactSchema = createInsertSchema(contacts, {
  companyId: t.String(),
  name: t.String(),
  email: t.String({ format: "email" }),
  phone: t.String({ minLength: 8 }),
  position: t.UnionEnum(positionEnum.enumValues),
});
export const updateContactSchema = t.Partial(insertContactSchema);
export const selectContactSchema = createSelectSchema(contacts);
