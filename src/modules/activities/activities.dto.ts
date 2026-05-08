import { t } from "elysia";
import { selectUserSchema } from "../users/users.dto";
import {
  insertActivitySchema,
  updateActivitySchema,
  selectActivitySchema,
  selectLeadSchema,
  selectContactSchema,
} from "../shared/base-schemas";

export const selectActivityNestedSchema = t.Composite([
  selectActivitySchema,
  t.Object({
    lead: t.Nullable(selectLeadSchema),
    contact: t.Nullable(selectContactSchema),
    user: t.Nullable(selectUserSchema),
  }),
]);

export { insertActivitySchema, updateActivitySchema, selectActivitySchema };
