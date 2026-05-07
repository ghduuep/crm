import { t } from "elysia";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { pipelineStages } from "../../db/schema/index";

export const insertPipelineStageSchema = createInsertSchema(pipelineStages, {
  name: t.String(),
  position: t.Integer({ minimum: 0 }),
});
export const updatePipelineStageSchema = t.Partial(insertPipelineStageSchema);
export const selectPipelineStageSchema = createSelectSchema(pipelineStages);
