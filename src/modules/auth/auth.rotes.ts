import { Elysia, t } from "elysia";
import { authService } from "./auth.service";
import { authJwt } from "./auth.jwt";
import { usersService } from "../users/users.service";
import { insertUserSchema } from "../../db/schema";

export const authRoutes = new Elysia()
  .use(authJwt)
  .post(
    "/login",
    async ({ body, jwt }) => {
      const user = await authService.validateUser(body.email, body.password);
      if (!user) {
        return { error: "Invalid credentials" };
      }
      const token = await jwt.sign({ sub: user.id, role: user.role });
      return { token };
    },
    {
      body: insertUserSchema,
    },
  )
  .post(
    "/register",
    async ({ body, jwt }) => {
      const user = await usersService.create(body);
      const token = await jwt.sign({ sub: user.id, role: user.role });
      return { token };
    },
    {
      body: insertUserSchema,
    },
  );
