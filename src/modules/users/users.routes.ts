import Elysia from "elysia";
import {
  insertUserSchema,
  selectUserSchema,
  updateUserSchema,
} from "../../db/schema";
import { usersService } from "./users.service";
import { t } from "elysia";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => usersService.getAll(), {
    response: t.Array(selectUserSchema),
  })
  .get("/:id", async ({ params }) => usersService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectUserSchema,
  })
  .post("/", async ({ body }) => usersService.create(body), {
    body: insertUserSchema,
    response: selectUserSchema,
  })
  .patch(
    "/:id",
    async ({ params, body }) => usersService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateUserSchema,
      response: selectUserSchema,
    },
  )
  .delete("/:id", async ({ params }) => usersService.delete(params.id), {
    params: t.Object({ id: t.String() }),
  });
