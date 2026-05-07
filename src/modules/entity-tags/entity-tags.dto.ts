import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { entityTags, entityTypeEnum } from "../../db/schema/index";

export const insertEntityTagSchema = createInsertSchema(entityTags, {
  tagId: t.String(),
  entityType: t.UnionEnum(entityTypeEnum.enumValues),
  entityId: t.String(),
});
export const updateEntityTagSchema = t.Partial(insertEntityTagSchema);
export const selectEntityTagSchema = createSelectSchema(entityTags);
