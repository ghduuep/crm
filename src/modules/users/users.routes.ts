import Elysia from "elysia";
import { insertUserSchema, selectUserSchema, updateUserSchema } from "../../db/schema";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => usersService.getAll(), {
    response: t.Array(selectUserSchema),
  })
  .get("/:id", async ({ params }) => usersService.getById(params), {
    params: t.Object({ id: t.String() }),
    response: selectUserSchema,
  })
  .post("/", async ({ body }) => usersService.create(body), {
    body: insertUserSchema,
    response: selectUserSchema,
  })
  .patch("/:id", async ({ params, body }) => usersService.update(params, body), {
    params: t.Object({ id: t.String() }),
    body: updateUserSchema,
    response: selectUserSchema,
  })
  .delete("/:id", async ({ params }) => usersService.delete(params), {
    params: t.Object({ id: t.String() }),
  });
