import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "../../db/schema";
import { tagsService } from "./tags.service";
import { t } from "elysia";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
  .get("/", async () => tagsService.getAll(), {
    response: t.Array(selectTagSchema),
  })
  .get("/:id", async ({ params }) => tagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
  })
  .post("/", async ({ body }) => tagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
  })
  .patch("/:id", async ({ params, body }) => tagsService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateTagSchema,
    response: selectTagSchema,
  })
  .delete("/:id", async ({ params }) => tagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
