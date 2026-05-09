import Elysia from "elysia";
import { t } from "elysia";
import { paginationSchema, paginatedSchema } from "../../utils/pagination";
import {
  insertCompanySchema,
  selectCompanySchema,
  selectCompanyNestedSchema,
  updateCompanySchema,
} from "./companies.dto";
import { companiesService } from "./companies.service";

export const companiesRoutes = new Elysia({ prefix: "/companies" })
  .get(
    "/",
    async ({ query, request }) =>
      companiesService.getAll(
        query as any,
        new URL(
          request.url,
          `http://${request.headers.get("host") ?? "localhost"}`,
        ).toString(),
      ),
    {
      query: paginationSchema,
      response: paginatedSchema(selectCompanySchema),
      auth: true,
      permissions: { companies: ["read"] },
      detail: {
        summary: "Get all companies",
        tags: ["companies"],
      },
    },
  )
  .get("/:id", async ({ params }) => companiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectCompanyNestedSchema,
    auth: true,
    permissions: { companies: ["read"] },
    detail: {
      summary: "Get company by id",
      tags: ["companies"],
    },
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
    auth: true,
    permissions: { companies: ["create"] },
    detail: {
      summary: "Create company",
      tags: ["companies"],
    },
  })
  .patch(
    "/:id",
    async ({ params, body }) => companiesService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateCompanySchema,
      response: selectCompanySchema,
      auth: true,
      permissions: { companies: ["update"] },
      detail: {
        summary: "Update company",
        tags: ["companies"],
      },
    },
  )
  .delete("/:id", async ({ params }) => companiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { companies: ["delete"] },
    detail: {
      summary: "Delete company",
      tags: ["companies"],
    },
  });
