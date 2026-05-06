import Elysia from "elysia";
import {
  insertPipelineStageSchema,
  selectPipelineStageSchema,
  updatePipelineStageSchema,
} from "../../db/schema";

export const pipelineStagesRoutes = new Elysia({ prefix: "/pipelineStages" })
  .get("/", async () => pipelineStagesService.getAll(), {
    response: t.Array(selectPipelineStageSchema),
  })
  .get("/:id", async ({ params }) => pipelineStagesService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectPipelineStageSchema,
  })
  .post("/", async ({ body }) => pipelineStagesService.create(body), {
    body: insertPipelineStageSchema,
    response: selectPipelineStageSchema,
  })
  .patch("/:id", async ({ params, body }) => pipelineStagesService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updatePipelineStageSchema,
    response: selectPipelineStageSchema,
  })
  .delete("/:id", async ({ params }) => pipelineStagesService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
