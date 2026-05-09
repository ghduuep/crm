import Elysia from "elysia";
import {
  insertLeadSchema,
  selectLeadSchema,
  selectLeadNestedSchema,
  selectLeadListNestedSchema,
  updateLeadSchema,
} from "./leads.dto";
import { leadsService } from "./leads.service";
import { t } from "elysia";
import { paginationSchema, paginatedSchema } from "../../utils/pagination";

export const leadsRoutes = new Elysia({ prefix: "/leads" })
  .get(
    "/",
    async ({ query, request }) =>
      leadsService.getAll(
        query as any,
        new URL(
          request.url,
          `http://${request.headers.get("host") ?? "localhost"}`,
        ).toString(),
      ),
    {
      query: paginationSchema,
      response: paginatedSchema(selectLeadListNestedSchema),
      auth: true,
      permissions: { leads: ["read"] },
      detail: {
        summary: "Get all leads",
        tags: ["leads"],
      },
    },
  )
  .get(
    "/:id",
    async ({ params }) => {
      const res = await leadsService.getById(params.id);
      return res as any;
    },
    {
      params: t.Object({ id: t.String() }),
      response: selectLeadNestedSchema,
      auth: true,
      permissions: { leads: ["read"] },
      detail: {
        summary: "Get lead by id",
        tags: ["leads"],
      },
    },
  )
  .post("/", async ({ body }) => leadsService.create(body), {
    body: insertLeadSchema,
    response: selectLeadSchema,
    auth: true,
    permissions: { leads: ["create"] },
    detail: {
      summary: "Create lead",
      tags: ["leads"],
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => leadsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateLeadSchema,
      response: selectLeadSchema,
      auth: true,
      permissions: { leads: ["update"] },
      detail: {
        summary: "Update lead",
        tags: ["leads"],
      },
    },
  )
  .delete("/:id", async ({ params }) => leadsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { leads: ["delete"] },
    detail: {
      summary: "Delete lead",
      tags: ["leads"],
    },
  });
