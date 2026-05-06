import Elysia from "elysia";
import { t } from "elysia";
import { selectContactSchema, insertContactSchema, updateContactSchema } from "../../db/schema";

export const contactsRoutes = new Elysia({ prefix: "/contacts" })
  .get("/", async () => contactsService.getAll(), {
    response: t.Array(selectContactSchema),
  })
  .get("/:id", async ({ params }) => contactsService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectContactSchema,
  })
  .post("/", async ({ body }) => contactsService.create(body), {
    body: insertContactSchema,
    response: selectContactSchema,
  })
  .patch("/:id", async ({ params, body }) => contactsService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateContactSchema,
    response: selectContactSchema,
  })
  .delete("/:id", async ({ params }) => contactsService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
