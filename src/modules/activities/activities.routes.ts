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
  })
  .get("/:id", async ({ params }) => activitiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectActivityNestedSchema,
    auth: true,
    permissions: { activities: ["read"] },
  })
  .post("/", async ({ body }) => activitiesService.create(body), {
    body: insertActivitySchema,
    response: selectActivitySchema,
    auth: true,
    permissions: { activities: ["create"] },
  })
  .patch(
    "/:id",
    async ({ params, body }) => activitiesService.update(params.id, body),
    {
      body: updateActivitySchema,
      response: selectActivitySchema,
      auth: true,
      permissions: { activities: ["update"] },
    },
  )
  .delete("/:id", async ({ params }) => activitiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { activities: ["delete"] },
  });
