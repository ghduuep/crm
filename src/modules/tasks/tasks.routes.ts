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
    permissions: { tasks: ["read"] },
    detail: {
      summary: "Get all tasks",
      tags: ["tasks"]
    },
  })
  .get("/:id", async ({ params }) => tasksService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTaskNestedSchema,
    auth: true,
    permissions: { tasks: ["read"] },
    detail: {
      summary: "Get task by id",
      tags: ["tasks"]
    },
  })
  .post("/", async ({ body }) => tasksService.create(body), {
    body: insertTaskSchema,
    response: selectTaskSchema,
    auth: true,
    permissions: { tasks: ["create"] },
    detail: {
      summary: "Create task",
      tags: ["tasks"]
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => tasksService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateTaskSchema,
      response: selectTaskSchema,
      auth: true,
      permissions: { tasks: ["update"] },
      detail: {
        summary: "Update task",
        tags: ["tasks"]
      },
    },
  )
  .delete("/:id", async ({ params }) => tasksService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { tasks: ["delete"] },
    detail: {
      summary: "Delete task",
      tags: ["tasks"]
    },
  });
