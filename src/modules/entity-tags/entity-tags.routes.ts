import Elysia from "elysia";
import {
  insertEntityTagSchema,
  selectEntityTagSchema,
  updateEntityTagSchema,
} from "../../db/schema";
import { entityTagsService } from "./entity-tags.service";
import { t } from "elysia";

export const entityTagsRoutes = new Elysia({ prefix: "/entityTags" })
  .get("/", async () => entityTagsService.getAll(), {
    response: t.Array(selectEntityTagSchema),
  })
  .get("/:id", async ({ params }) => entityTagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectEntityTagSchema,
  })
  .post("/", async ({ body }) => entityTagsService.create(body), {
    body: insertEntityTagSchema,
    response: selectEntityTagSchema,
  })
  .patch(
    "/:id",
    async ({ params, body }) => entityTagsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateEntityTagSchema,
      response: selectEntityTagSchema,
    },
  )
  .delete("/:id", async ({ params }) => entityTagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
