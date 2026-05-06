import Elysia from "elysia";
import { t } from "elysia";
import { insertCompanySchema, selectCompanySchema, updateCompanySchema } from "../../db/schema";
import { companiesService } from "./companies.service";

export const companiesRoutes = new Elysia({ prefix: "/companies" })
  .get("/", async () => companiesService.getAll(), {
    response: t.Array(selectCompanySchema),
  })
  .get("/:id", async ({ params }) => companiesService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectCompanySchema,
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
  })
  .patch("/:id", async ({ params, body }) => companiesService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateCompanySchema,
    response: selectCompanySchema,
  })
  .delete("/:id", async ({ params }) => companiesService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
