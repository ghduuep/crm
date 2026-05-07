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

export const insertPipelineStageSchema = createInsertSchema(pipelineStages, {
  name: t.String(),
  position: t.Integer({ minimum: 0 }),
});
export const updatePipelineStageSchema = t.Partial(insertPipelineStageSchema);
export const selectPipelineStageSchema = createSelectSchema(pipelineStages);
