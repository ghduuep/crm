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

export const leadsRoutes = new Elysia({ prefix: "/leads" })
  .get(
    "/",
    async () => {
      const res = await leadsService.getAll();
      return res as any;
    },
    {
      response: t.Array(selectLeadListNestedSchema),
      auth: true,
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
    },
  )
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
