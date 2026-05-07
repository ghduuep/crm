import Elysia from "elysia";
import { insertTagSchema, selectTagSchema, updateTagSchema } from "../../db/schema";
import { tagsService } from "./tags.service";
import { t } from "elysia";

export const tagsRoutes = new Elysia({ prefix: "/tags" })
  .get("/", async () => tagsService.getAll(), {
    response: t.Array(selectTagSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => tagsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectTagSchema,
    auth: true,
  })
  .post("/", async ({ body }) => tagsService.create(body), {
    body: insertTagSchema,
    response: selectTagSchema,
    auth: true,
  })
  .patch("/:id", async ({ params, body }) => tagsService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateTagSchema,
    response: selectTagSchema,
    auth: true,
  })
  .delete("/:id", async ({ params }) => tagsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
