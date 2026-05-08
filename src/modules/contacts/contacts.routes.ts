import Elysia from "elysia";
import { t } from "elysia";
import {
  selectContactSchema,
  selectContactNestedSchema,
  insertContactSchema,
  updateContactSchema,
} from "./contacts.dto";
import { contactsService } from "./contacts.service";

export const contactsRoutes = new Elysia({ prefix: "/contacts" })
  .get("/", async () => contactsService.getAll(), {
    response: t.Array(selectContactNestedSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => contactsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectContactNestedSchema,
    auth: true,
  })
  .post("/", async ({ body }) => contactsService.create(body), {
    body: insertContactSchema,
    response: selectContactSchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => contactsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateContactSchema,
      response: selectContactSchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => contactsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
