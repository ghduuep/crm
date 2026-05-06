import Elysia from "elysia";
import { insertTaskSchema, selectTaskSchema, updateTaskSchema } from "../../db/schema";

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .get("/", async () => tasksService.getAll(), {
    response: t.Array(selectTaskSchema),
  })
  .get("/:id", async ({ params }) => tasksService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectTaskSchema,
  })
  .post("/", async ({ body }) => tasksService.create(body), {
    body: insertTaskSchema,
    response: selectTaskSchema,
  })
  .patch("/:id", async ({ params, body }) => tasksService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateTaskSchema,
    response: selectTaskSchema,
  })
  .delete("/:id", async ({ params }) => tasksService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
