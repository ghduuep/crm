import Elysia from "elysia";
import { t } from "elysia";
import {
  insertCompanySchema,
  selectCompanySchema,
  updateCompanySchema,
} from "./companies.dto";
import { companiesService } from "./companies.service";

export const companiesRoutes = new Elysia({ prefix: "/companies" })
  .get("/", async () => companiesService.getAll(), {
    response: t.Array(selectCompanySchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => companiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectCompanySchema,
    auth: true,
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => companiesService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateCompanySchema,
      response: selectCompanySchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => companiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
