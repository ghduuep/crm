import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "./tags.dto";
import { tagsService } from "./tags.service";
import { t } from "elysia";
import { paginationSchema, paginatedSchema } from "../../utils/pagination";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
  .get(
    "/",
    async ({ query, request }) =>
      tagsService.getAll(
        query as any,
        new URL(
          request.url,
          `http://${request.headers.get("host") ?? "localhost"}`,
        ).toString(),
      ),
    {
      query: paginationSchema,
      response: paginatedSchema(selectTagSchema),
      permissions: { tags: ["read"] },
      auth: true,
      detail: {
        summary: "Get all tags",
        tags: ["tags"],
      },
    },
  )
  .get("/:id", async ({ params }) => tagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
    permissions: { tags: ["read"] },
    auth: true,
    detail: {
      summary: "Get tag by id",
      tags: ["tags"],
    },
  })
  .post("/", async ({ body }) => tagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
    permissions: { tags: ["create"] },
    auth: true,
    detail: {
      summary: "Create tag",
      tags: ["tags"],
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => tagsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateTagSchema,
      response: selectTagSchema,
      permissions: { tags: ["update"] },
      auth: true,
      detail: {
        summary: "Update tag",
        tags: ["tags"],
      },
    },
  )
  .delete("/:id", async ({ params }) => tagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    permissions: { tags: ["delete"] },
    auth: true,
    detail: {
      summary: "Delete tag",
      tags: ["tags"],
    },
  });
