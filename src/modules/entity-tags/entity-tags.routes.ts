import Elysia from "elysia";
import {
  insertEntityTagSchema,
  selectEntityTagSchema,
  updateEntityTagSchema,
} from "./entity-tags.dto";
import { entityTagsService } from "./entity-tags.service";
import { t } from "elysia";

export const entityTagsRoutes = new Elysia({ prefix: "/entityTags" })
  .get("/", async () => entityTagsService.getAll(), {
    response: t.Array(selectEntityTagSchema),
    auth: true,
    permissions: { entityTags: ["read"] },
  })
  .get("/:id", async ({ params }) => entityTagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectEntityTagSchema,
    auth: true,
    permissions: { entityTags: ["read"] },
  })
  .post("/", async ({ body }) => entityTagsService.create(body), {
    body: insertEntityTagSchema,
    response: selectEntityTagSchema,
    auth: true,
    permissions: { entityTags: ["create"] },
  })
  .patch(
    "/:id",
    async ({ params, body }) => entityTagsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateEntityTagSchema,
      response: selectEntityTagSchema,
      auth: true,
      permissions: { entityTags: ["update"] },
    },
  )
  .delete("/:id", async ({ params }) => entityTagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { entityTags: ["delete"] },
  });
