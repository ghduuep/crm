import Elysia from "elysia";
import { t } from "elysia";
import { selectContactSchema, insertContactSchema, updateContactSchema } from "../../db/schema";
import { contactsService } from "./contacts.service";

export const contactsRoutes = new Elysia({ prefix: "/contacts" })
  .get("/", async () => contactsService.getAll(), {
    response: t.Array(selectContactSchema),
  })
  .get("/:id", async ({ params }) => contactsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectContactSchema,
  })
  .post("/", async ({ body }) => contactsService.create(body), {
    body: insertContactSchema,
    response: selectContactSchema,
  })
  .patch("/:id", async ({ params, body }) => contactsService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateContactSchema,
    response: selectContactSchema,
  })
  .delete("/:id", async ({ params }) => contactsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
