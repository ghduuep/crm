import { t } from "elysia";
import { rolesEnum } from "../../db/schema/index";
import {
  insertUserSchema,
  updateUserSchema,
  selectUserSchema,
} from "../shared/base-schemas";

export const updateUserRoleSchema = t.Object({
  role: t.Nullable(t.UnionEnum(rolesEnum.enumValues)),
});

export const updateUserProfileSchema = t.Object({
  name: t.Nullable(t.String()),
  email: t.String({ format: "email" }),
  emailVerified: t.Boolean(),
  image: t.Nullable(t.String()),
});

export { insertUserSchema, updateUserSchema, selectUserSchema };
