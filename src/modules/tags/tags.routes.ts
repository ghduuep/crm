import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "./tags.dto";
import { tagsService } from "./tags.service";
import { t } from "elysia";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
  .get("/", async () => tagsService.getAll(), {
    response: t.Array(selectTagSchema),
    permissions: { tags: ["read"] },
    auth: true,
  })
  .get("/:id", async ({ params }) => tagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
    permissions: { tags: ["read"] },
    auth: true,
  })
  .post("/", async ({ body }) => tagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
    permissions: { tags: ["create"] },
    auth: true,
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
    },
  )
  .delete("/:id", async ({ params }) => tagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    permissions: { tags: ["delete"] },
    auth: true,
  });
