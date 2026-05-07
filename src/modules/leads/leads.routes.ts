import Elysia from "elysia";
import {
  insertLeadSchema,
  selectLeadSchema,
  updateLeadSchema,
} from "./leads.dto";
import { leadsService } from "./leads.service";
import { t } from "elysia";

export const leadsRoutes = new Elysia({ prefix: "/leads" })
  .get("/", async () => leadsService.getAll(), {
    response: t.Array(selectLeadSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => leadsService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectLeadSchema,
    auth: true,
  })
  .post("/", async ({ body }) => leadsService.create(body), {
    body: insertLeadSchema,
    response: selectLeadSchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => leadsService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateLeadSchema,
      response: selectLeadSchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => leadsService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
