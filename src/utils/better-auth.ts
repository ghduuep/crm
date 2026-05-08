import Elysia from "elysia";
import { auth } from "./auth";
import { Role } from "./permissions";

export const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });
        if (!session) return status(401);
        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .macro({
    permissions: (permissions: Record<string, string[]>) => {
      return {
        async resolve({ status, request: { headers } }) {
          const session = await auth.api.getSession({
            headers,
          });
          if (!session) return status(401);
          const result = await auth.api.userHasPermission({
            body: {
              role: session.user.role as Role | undefined,
              permissions: permissions,
            },
          });
          if (!result.success) return status(403);
          return {
            user: session.user,
            session: session.session,
          };
        },
      };
    },
  });
