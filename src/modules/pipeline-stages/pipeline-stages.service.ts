import { pipelineStages } from "../../db/schema/index";
import {
  updatePipelineStageSchema,
  insertPipelineStageSchema,
} from "./pipeline-stages.dto";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const pipelineStagesService = {
  getAll: async () => {
    return await db.query.pipelineStages.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.pipelineStages.findFirst({
      where: (pipelineStages, { eq }) => eq(pipelineStages.id, id),
    });

    if (!response) throw new NotFoundError("Pipeline stage not found");

    return response;
  },
  create: async (stage: typeof insertPipelineStageSchema.static) => {
    const [result] = await db.insert(pipelineStages).values(stage).returning();
    return result;
  },
  update: async (
    id: string,
    stage: typeof updatePipelineStageSchema.static,
  ) => {
    const [result] = await db
      .update(pipelineStages)
      .set(stage)
      .where(eq(pipelineStages.id, id))
      .returning();

    if (!result) throw new NotFoundError("Pipeline stage not found");

    return result;
  },
  delete: async (id: string) => {
    const [result] = await db
      .delete(pipelineStages)
      .where(eq(pipelineStages.id, id))
      .returning();

    if (!result) throw new NotFoundError("Pipeline stage not found");

    return null;
  },
};
