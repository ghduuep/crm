import Elysia from "elysia";
import {
  insertPipelineStageSchema,
  selectPipelineStageSchema,
  updatePipelineStageSchema,
} from "../../db/schema";
import { pipelineStagesService } from "./pipeline-stages.service";
import { t } from "elysia";

export const pipelineStagesRoutes = new Elysia({ prefix: "/pipelineStages" })
  .get("/", async () => pipelineStagesService.getAll(), {
    response: t.Array(selectPipelineStageSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => pipelineStagesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectPipelineStageSchema,
    auth: true,
  })
  .post("/", async ({ body }) => pipelineStagesService.create(body), {
    body: insertPipelineStageSchema,
    response: selectPipelineStageSchema,
    auth: true,
  })
  .patch("/:id", async ({ params, body }) => pipelineStagesService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updatePipelineStageSchema,
    response: selectPipelineStageSchema,
    auth: true,
  })
  .delete("/:id", async ({ params }) => pipelineStagesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
