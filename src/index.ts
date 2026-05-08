import { Context, Elysia } from "elysia";
import "dotenv/config";
import { tasksRoutes } from "./modules/tasks/tasks.routes";
import { tagsRoutes } from "./modules/tags/tags.routes";
import { pipelineStagesRoutes } from "./modules/pipeline-stages/pipeline-stages.routes";
import { leadsRoutes } from "./modules/leads/leads.routes";
import { entityTagsRoutes } from "./modules/entity-tags/entity-tags.routes";
import { contactsRoutes } from "./modules/contacts/contacts.routes";
import { companiesRoutes } from "./modules/companies/companies.routes";
import { activitiesRoutes } from "./modules/activities/activities.routes";
import { auth } from "./utils/auth";
import { betterAuth } from "./utils/better-auth";
import { usersRoutes } from "./modules/users/users.routes";
import cors from "@elysia/cors";
import openapi, { fromTypes } from "@elysia/openapi";

const betterAuthView = (context: Context) => {
  const BETTER_AUTH_ACCEPT_METHODS = ["POST", "GET"];

  if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return auth.handler(context.request);
  } else {
    context.error(405);
  }
};

const app = new Elysia()
  .onError(({ error, code, set }) => {
    switch (code) {
      case "NOT_FOUND":
        set.status = 404;
        return { code: "NOT_FOUND", message: error.message };

      case "VALIDATION":
        set.status = 422;
        return { code: "VALIDATION_ERROR", message: error.message };

      case "PARSE":
        set.status = 400;
        return { code: "PARSE_ERROR", message: "Invalid request body" };

      case "INTERNAL_SERVER_ERROR":
        set.status = 500;
        return { code: "INTERNAL_ERROR", message: error.message };

      default:
        console.error(`[Unhandled error] ${code}`, error);
        set.status = 500;
        return {
          code: "INTERNAL_ERROR",
          message: "An unexpected error occurred",
        };
    }
  })
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  )
  .mount(auth.handler)
  .use(
    openapi({
      references: fromTypes(),
      documentation: {
        info: {
          title: "AuroraCRM",
          version: "1.0.0",
          description: "API documentation for AuroraCRM",
        },
      },
    }),
  )
  .use(betterAuth)
  .use(usersRoutes)
  .use(tasksRoutes)
  .use(tagsRoutes)
  .use(pipelineStagesRoutes)
  .use(leadsRoutes)
  .use(entityTagsRoutes)
  .use(contactsRoutes)
  .use(companiesRoutes)
  .use(activitiesRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
