import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const tags = pgTable("tags", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name").notNull(),
});

export const insertTagSchema = createInsertSchema(tags, {
  name: t.String(),
});
export const updateTagSchema = t.Partial(insertTagSchema);
export const selectTagSchema = createSelectSchema(tags);
