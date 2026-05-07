import Elysia from "elysia";
import {
  selectUserSchema,
  updateUserProfileSchema,
  updateUserRoleSchema,
} from "../../db/schema/index";
import { usersService } from "./users.service";
import { t } from "elysia";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => usersService.getAll(), {
    response: t.Array(selectUserSchema),
    auth: true,
  })
  .get("/:id", async ({ params }) => usersService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectUserSchema,
    auth: true,
  })
  .patch(
    "/:id",
    async ({ params, body }) => usersService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateUserProfileSchema,
      response: selectUserSchema,
      auth: true,
    },
  )
  .patch(
    "/:id/role",
    async ({ params, body }) => usersService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateUserRoleSchema,
      response: selectUserSchema,
      auth: true,
    },
  )
  .delete("/:id", async ({ params }) => usersService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    auth: true,
  });
