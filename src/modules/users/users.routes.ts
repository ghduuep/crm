import Elysia from "elysia";
import {
  selectUserSchema,
  updateUserProfileSchema,
  updateUserRoleSchema,
} from "./users.dto";
import { usersService } from "./users.service";
import { t } from "elysia";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => usersService.getAll(), {
    response: t.Array(selectUserSchema),
    permissions: { users: ["read"] },
  })
  .get("/:id", async ({ params }) => usersService.getById(params.id), {
    params: t.Object({ id: t.String() }),
    response: selectUserSchema,
    permissions: { users: ["read"] },
  })
  .patch(
    "/:id",
    async ({ params, body }) => usersService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateUserProfileSchema,
      response: selectUserSchema,
      permissions: { users: ["update"] },
    },
  )
  .patch(
    "/:id/role",
    async ({ params, body }) => usersService.update(params.id, body),
    {
      params: t.Object({ id: t.String() }),
      body: updateUserRoleSchema,
      response: selectUserSchema,
      permissions: { users: ["update"] },
    },
  )
  .delete("/:id", async ({ params }) => usersService.delete(params.id), {
    params: t.Object({ id: t.String() }),
    permissions: { users: ["delete"] },
  });
