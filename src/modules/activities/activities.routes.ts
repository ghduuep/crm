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
  })
  .get("/:id", async ({ params }) => activitiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectActivitySchema,
  })
  .post("/", async ({ body }) => activitiesService.create(body), {
    body: insertActivitySchema,
    response: selectActivitySchema,
  })
  .patch(
    "/:id",
    async ({ params, body }) => activitiesService.update(params.id, body),
    {
      body: updateActivitySchema,
      response: selectActivitySchema,
    },
  )
  .delete("/:id", async ({ params }) => activitiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    response: 200,
  });
