import { pipelineStages } from "../../db/schema/index";
import {
  updatePipelineStageSchema,
  insertPipelineStageSchema,
} from "./pipeline-stages.dto";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { desc, eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const pipelineStagesService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.pipelineStages.findMany({
      orderBy: desc(pipelineStages.name),
      limit,
      offset,
    });

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(pipelineStages);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
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
