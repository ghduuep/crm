import Elysia from "elysia";
import { t } from "elysia";
import { paginationSchema, paginatedSchema } from "../../utils/pagination";
import {
  selectContactSchema,
  selectContactNestedSchema,
  insertContactSchema,
  updateContactSchema,
} from "./contacts.dto";
import { contactsService } from "./contacts.service";

export const contactsRoutes = new Elysia({ prefix: "/contacts" })
  .get(
    "/",
    async ({ query, request }) =>
      contactsService.getAll(
        query as any,
        new URL(
          request.url,
          `http://${request.headers.get("host") ?? "localhost"}`,
        ).toString(),
      ),
    {
      query: paginationSchema,
      response: paginatedSchema(selectContactNestedSchema),
      permissions: { contacts: ["read"] },
      auth: true,
      detail: {
        summary: "Get all contacts",
        tags: ["contacts"],
      },
    },
  )
  .get("/:id", async ({ params }) => contactsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectContactNestedSchema,
    permissions: { contacts: ["read"] },
    auth: true,
    detail: {
      summary: "Get contact by id",
      tags: ["contacts"],
    },
  })
  .post("/", async ({ body }) => contactsService.create(body), {
    body: insertContactSchema,
    response: selectContactSchema,
    permissions: { contacts: ["create"] },
    auth: true,
    detail: {
      summary: "Create contact",
      tags: ["contacts"],
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => contactsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateContactSchema,
      response: selectContactSchema,
      permissions: { contacts: ["update"] },
      auth: true,
      detail: {
        summary: "Update contact",
        tags: ["contacts"],
      },
    },
  )
  .delete("/:id", async ({ params }) => contactsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    permissions: { contacts: ["delete"] },
    auth: true,
    detail: {
      summary: "Delete contact",
      tags: ["contacts"],
    },
  });
