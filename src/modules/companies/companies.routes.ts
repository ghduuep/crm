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
    permissions: { companies: ["read"] },
  })
  .get("/:id", async ({ params }) => companiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectCompanyNestedSchema,
    permissions: { companies: ["read"] },
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
    permissions: { companies: ["create"] },
  })
  .patch(
    "/:id",
    async ({ params, body }) => companiesService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateCompanySchema,
      response: selectCompanySchema,
      permissions: { companies: ["update"] },
    },
  )
  .delete("/:id", async ({ params }) => companiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    permissions: { companies: ["delete"] },
  });
