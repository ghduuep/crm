import Elysia from "elysia";
import { insertTaskSchema, selectTaskSchema, updateTaskSchema } from "../../db/schema";
import { tasksService } from "./tasks.service";
import { t } from "elysia";

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .get("/", async () => tasksService.getAll(), {
    response: t.Array(selectTaskSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => tasksService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTaskSchema,
    auth: true,
  })
  .post("/", async ({ body }) => tasksService.create(body), {
    body: insertTaskSchema,
    response: selectTaskSchema,
    auth: true,
  })
  .patch("/:id", async ({ params, body }) => tasksService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateTaskSchema,
    response: selectTaskSchema,
    auth: true,
  })
  .delete("/:id", async ({ params }) => tasksService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
