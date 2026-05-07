import { createId } from "@paralleldrive/cuid2";
import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const pipelineStages = pgTable("pipeline_stages", {
  id: varchar("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: varchar("name").notNull(),
  position: integer("position").notNull(),
});
