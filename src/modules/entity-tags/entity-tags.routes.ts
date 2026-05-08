import Elysia from "elysia";
import {
  insertEntityTagSchema,
  selectEntityTagSchema,
  updateEntityTagSchema,
} from "./entity-tags.dto";
import { entityTagsService } from "./entity-tags.service";
import { t } from "elysia";

export const entityTagsRoutes = new Elysia({ prefix: "/entity-tags" })
  .get("/", async () => entityTagsService.getAll(), {
    response: t.Array(selectEntityTagSchema),
    auth: true,
    permissions: { entityTags: ["read"] },
    detail: {
      summary: "Get all entity tags",
      tags: ["entity-tags"]
    },
  })
  .get("/:id", async ({ params }) => entityTagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectEntityTagSchema,
    auth: true,
    permissions: { entityTags: ["read"] },
    detail: {
      summary: "Get entity tag by id",
      tags: ["entity-tags"]
    },
  })
  .post("/", async ({ body }) => entityTagsService.create(body), {
    body: insertEntityTagSchema,
    response: selectEntityTagSchema,
    auth: true,
    permissions: { entityTags: ["create"] },
    detail: {
      summary: "Create entity tag",
      tags: ["entity-tags"]
    },
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
      detail: {
        summary: "Update entity tag",
        tags: ["entity-tags"]
      },
    },
  )
  .delete("/:id", async ({ params }) => entityTagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { entityTags: ["delete"] },
    detail: {
      summary: "Delete entity tag",
      tags: ["entity-tags"]
    },
  });
