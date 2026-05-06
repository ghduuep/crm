import Elysia from "elysia";
import { t } from "elysia";
import { insertCompanySchema, selectCompanySchema } from "../../db/schema";

export const companiesRoutes = new Elysia({ prefix: "/companies" })
  .get("/", async () => companiesService.getAll(), {
    response: t.Array(selectCompanySchema),
  })
  .get("/:id", async ({ params }) => companiesService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectCompanySchema,
  })
  .post("/", async ({ body }) => companiesService.create(body), {
    body: insertCompanySchema,
    response: selectCompanySchema,
  })
  .patch("/:id", async ({ params }) => companiesService.update(params), {
    params: t.Object({ id: t.String() }),
    response: selectCompanySchema,
  })
  .delete("/:id", async ({ params }) => companiesService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
