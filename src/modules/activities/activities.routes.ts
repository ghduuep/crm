import Elysia from "elysia";
import { t } from "elysia";
import {
  insertActivitySchema,
  selectActivitySchema,
  selectActivityNestedSchema,
  updateActivitySchema,
} from "./activities.dto";
import { activitiesService } from "./activities.service";

export const activitiesRoutes = new Elysia({ prefix: "/activities" })
  .get("/", async () => activitiesService.getAll(), {
    response: t.Array(selectActivityNestedSchema),
    auth: true,
    permissions: { activities: ["read"] },
    detail: {
      summary: "Get all activities",
      tags: ["activities"]
    },
  })
  .get("/:id", async ({ params }) => activitiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectActivityNestedSchema,
    auth: true,
    permissions: { activities: ["read"] },
    detail: {
      summary: "Get activity by id",
      tags: ["activities"]
    },
  })
  .post("/", async ({ body }) => activitiesService.create(body), {
    body: insertActivitySchema,
    response: selectActivitySchema,
    auth: true,
    permissions: { activities: ["create"] },
    detail: {
      summary: "Create activity",
      tags: ["activities"]
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => activitiesService.update(params.id, body),
    {
      body: updateActivitySchema,
      response: selectActivitySchema,
      auth: true,
      permissions: { activities: ["update"] },
      detail: {
        summary: "Update activity",
        tags: ["activities"]
      },
    },
  )
  .delete("/:id", async ({ params }) => activitiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { activities: ["delete"] },
    detail: {
      summary: "Delete activity",
      tags: ["activities"]
    },
  });
