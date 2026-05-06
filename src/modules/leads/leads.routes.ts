import Elysia from "elysia";
import { insertLeadSchema, selectLeadSchema, updateLeadSchema } from "../../db/schema";

export const leadsRoutes = new Elysia({ prefix: "/leads" })
  .get("/", async () => leadsService.getAll(), {
    response: t.Array(selectLeadSchema),
  })
  .get("/:id", async ({ params }) => leadsService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectLeadSchema,
  })
  .post("/", async ({ body }) => leadsService.create(body), {
    body: insertLeadSchema,
    response: selectLeadSchema,
  })
  .patch("/:id", async ({ params, body }) => leadsService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateLeadSchema,
    response: selectLeadSchema,
  })
  .delete("/:id", async ({ params }) => leadsService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
