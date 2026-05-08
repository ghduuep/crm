import Elysia from "elysia";
import {
  insertTaskSchema,
  selectTaskSchema,
  selectTaskNestedSchema,
  updateTaskSchema,
} from "./tasks.dto";
import { tasksService } from "./tasks.service";
import { t } from "elysia";

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .get("/", async () => tasksService.getAll(), {
    response: t.Array(selectTaskNestedSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => tasksService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTaskNestedSchema,
    auth: true,
  })
  .post("/", async ({ body }) => tasksService.create(body), {
    body: insertTaskSchema,
    response: selectTaskSchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => tasksService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateTaskSchema,
      response: selectTaskSchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => tasksService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
