import Elysia from "elysia";
import {
  insertPipelineStageSchema,
  selectPipelineStageSchema,
  updatePipelineStageSchema,
} from "./pipeline-stages.dto";
import { pipelineStagesService } from "./pipeline-stages.service";
import { t } from "elysia";

export const pipelineStagesRoutes = new Elysia({ prefix: "/pipeline-stages" })
  .get("/", async () => pipelineStagesService.getAll(), {
    response: t.Array(selectPipelineStageSchema),
    auth: true,
    permissions: { pipelineStages: ["read"] },
    detail: {
      summary: "Get all pipeline stages",
      tags: ["pipeline-stages"]
    },
  })
  .get("/:id", async ({ params }) => pipelineStagesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectPipelineStageSchema,
    auth: true,
    permissions: { pipelineStages: ["read"] },
    detail: {
      summary: "Get pipeline stage by id",
      tags: ["pipeline-stages"]
    },
  })
  .post("/", async ({ body }) => pipelineStagesService.create(body), {
    body: insertPipelineStageSchema,
    response: selectPipelineStageSchema,
    auth: true,
    permissions: { pipelineStages: ["create"] },
    detail: {
      summary: "Create pipeline stage",
      tags: ["pipeline-stages"]
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => pipelineStagesService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updatePipelineStageSchema,
      response: selectPipelineStageSchema,
      auth: true,
      permissions: { pipelineStages: ["update"] },
      detail: {
        summary: "Update pipeline stage",
        tags: ["pipeline-stages"]
      },
    },
  )
  .delete(
    "/:id",
    async ({ params }) => pipelineStagesService.delete(params.id),
    {
      params: t.Object({ id: t.String() }),
      auth: true,
      permissions: { pipelineStages: ["delete"] },
      detail: {
        summary: "Delete pipeline stage",
        tags: ["pipeline-stages"]
      },
    },
  );
