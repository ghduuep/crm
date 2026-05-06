import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "../../db/schema";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
  .get("/", async () => tagsService.getAll(), {
    response: t.Array(selectTagSchema),
  })
  .get("/:id", async ({ params }) => tagsService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
  })
  .post("/", async ({ body }) => tagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
  })
  .patch("/:id", async ({ params, body }) => tagsService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateTagSchema,
    response: selectTagSchema,
  })
  .delete("/:id", async ({ params }) => tagsService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
