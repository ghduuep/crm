import Elysia from "elysia";
import { insertLeadSchema, selectLeadSchema, updateLeadSchema } from "../../db/schema";
import { leadsService } from "./leads.service";
import { t } from "elysia";

export const leadsRoutes = new Elysia({ prefix: "/leads" })
  .get("/", async () => leadsService.getAll(), {
    response: t.Array(selectLeadSchema),
  })
  .get("/:id", async ({ params }) => leadsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectLeadSchema,
  })
  .post("/", async ({ body }) => leadsService.create(body), {
    body: insertLeadSchema,
    response: selectLeadSchema,
  })
  .patch("/:id", async ({ params, body }) => leadsService.update(params.id, body), {
    params: t.Object({ id: t.String() }),
    body: updateLeadSchema,
    response: selectLeadSchema,
  })
  .delete("/:id", async ({ params }) => leadsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
