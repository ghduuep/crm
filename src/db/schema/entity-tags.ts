import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { tags } from "./tags";

export const entityTypeEnum = pgEnum("entity_type", [
  "lead",
  "contact",
  "company",
]);

export const entityTags = pgTable("entity_tags", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  tagId: varchar("tag_id").references(() => tags.id),
  entityType: entityTypeEnum(),
  entityId: varchar("entity_id").notNull(),
});

export const insertEntityTagSchema = createInsertSchema(entityTags, {
  tagId: t.String(),
  entityType: t.UnionEnum(entityTypeEnum.enumValues),
  entityId: t.String(),
});
export const updateEntityTagSchema = t.Partial(insertEntityTagSchema);
export const selectEntityTagSchema = createSelectSchema(entityTags);
