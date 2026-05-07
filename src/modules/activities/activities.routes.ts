import Elysia from "elysia";
import { t } from "elysia";
import {
  insertActivitySchema,
  selectActivitySchema,
  updateActivitySchema,
} from "../../db/schema";
import { activitiesService } from "./activities.service";

export const activitiesRoutes = new Elysia({ prefix: "/activities" })
  .get("/", async () => activitiesService.getAll(), {
    response: t.Array(selectActivitySchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => activitiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectActivitySchema,
    auth: true,
  })
  .post("/", async ({ body }) => activitiesService.create(body), {
    body: insertActivitySchema,
    response: selectActivitySchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => activitiesService.update(params.id, body),
    {
      body: updateActivitySchema,
      response: selectActivitySchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => activitiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
