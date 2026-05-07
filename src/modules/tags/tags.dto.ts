import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { tags } from "../../db/schema/index";

export const insertTagSchema = createInsertSchema(tags, {
  name: t.String(),
});
export const updateTagSchema = t.Partial(insertTagSchema);
export const selectTagSchema = createSelectSchema(tags);
