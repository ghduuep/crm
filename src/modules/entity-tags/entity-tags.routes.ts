import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "../../db/schema";

export const entityTagsRoutes = new Elysia({ prefix: "/entityTags" })
  .get("/", async () => entityTagsService.getAll(), {
    response: t.Array(selectTagSchema),
  })
  .get("/:id", async ({ params }) => entityTagsService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
  })
  .post("/", async ({ body }) => entityTagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
  })
  .patch("/:id", async ({ params, body }) => entityTagsService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateTagSchema,
    response: selectTagSchema,
  })
  .delete("/:id", async ({ params }) => entityTagsService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
