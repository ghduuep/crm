import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { users, rolesEnum } from "../../db/schema/index";

export const insertUserSchema = createInsertSchema(users, {
  name: t.Nullable(t.String()),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
  role: t.Nullable(t.UnionEnum(rolesEnum.enumValues)),
});

export const updateUserRoleSchema = t.Object({
  role: t.Nullable(t.UnionEnum(rolesEnum.enumValues)),
});

export const updateUserProfileSchema = t.Object({
  name: t.Nullable(t.String()),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
});

export const updateUserSchema = t.Partial(insertUserSchema);
export const selectUserSchema = t.Omit(createSelectSchema(users) as any, [
  "password",
]);
