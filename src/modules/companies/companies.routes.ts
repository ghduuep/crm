import Elysia from "elysia";
import { t } from "elysia";
import {
  insertCompanySchema,
  selectCompanySchema,
  selectCompanyNestedSchema,
  updateCompanySchema,
} from "./companies.dto";
import { companiesService } from "./companies.service";

export const companiesRoutes = new Elysia({ prefix: "/companies" })
  .get("/", async () => companiesService.getAll(), {
    response: t.Array(selectCompanySchema),
    auth: true,
    permissions: { companies: ["read"] },
    detail: {
      summary: "Get all companies",
      tags: ["companies"]
    },
  })
  .get("/:id", async ({ params }) => companiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectCompanyNestedSchema,
    auth: true,
    permissions: { companies: ["read"] },
    detail: {
      summary: "Get company by id",
      tags: ["companies"]
    },
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
    auth: true,
    permissions: { companies: ["create"] },
    detail: {
      summary: "Create company",
      tags: ["companies"]
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
        tags: ["companies"]
      },
    },
  )
  .delete("/:id", async ({ params }) => companiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
    permissions: { companies: ["delete"] },
    detail: {
      summary: "Delete company",
      tags: ["companies"]
    },
  });
