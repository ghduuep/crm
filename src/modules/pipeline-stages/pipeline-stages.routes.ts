import Elysia from "elysia";
import {
  insertPipelineStageSchema,
  selectPipelineStageSchema,
  updatePipelineStageSchema,
} from "./pipeline-stages.dto";
import { pipelineStagesService } from "./pipeline-stages.service";
import { t } from "elysia";

export const pipelineStagesRoutes = new Elysia({ prefix: "/pipelineStages" })
  .get("/", async () => pipelineStagesService.getAll(), {
    response: t.Array(selectPipelineStageSchema),
    permissions: { pipelineStages: ["read"] },
  })
  .get("/:id", async ({ params }) => pipelineStagesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectPipelineStageSchema,
    permissions: { pipelineStages: ["read"] },
  })
  .post("/", async ({ body }) => pipelineStagesService.create(body), {
    body: insertPipelineStageSchema,
    response: selectPipelineStageSchema,
    permissions: { pipelineStages: ["create"] },
  })
  .patch(
    "/:id",
    async ({ params, body }) => pipelineStagesService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updatePipelineStageSchema,
      response: selectPipelineStageSchema,
      permissions: { pipelineStages: ["update"] },
    },
  )
  .delete(
    "/:id",
    async ({ params }) => pipelineStagesService.delete(params.id),
    {
      params: t.Object({ id: t.String() }),
      permissions: { pipelineStages: ["delete"] },
    },
  );
