import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { users, rolesEnum } from "../../db/schema/index";

export const insertUserSchema = createInsertSchema(users, {
  email: t.String({ format: "email" }),
});

export const updateUserRoleSchema = t.Object({
  role: t.UnionEnum(rolesEnum.enumValues),
});

export const updateUserProfileSchema = t.Object({
  name: t.String(),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.String(),
});

export const updateUserSchema = t.Partial(insertUserSchema);
export const selectUserSchema = t.Omit(createSelectSchema(users) as any, [
  "password",
]);
