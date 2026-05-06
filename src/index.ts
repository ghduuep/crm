import { Elysia } from "elysia";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./db/schema";
import { usersRoutes } from "./modules/users/users.routes";
import { tasksRoutes } from "./modules/tasks/tasks.routes";
import { tagsRoutes } from "./modules/tags/tags.routes";
import { pipelineStagesRoutes } from "./modules/pipeline-stages/pipeline-stages.routes";
import { leadsRoutes } from "./modules/leads/leads.routes";
import { entityTagsRoutes } from "./modules/entity-tags/entity-tags.routes";
import { contactsRoutes } from "./modules/contacts/contacts.routes";
import { companiesRoutes } from "./modules/companies/companies.routes";
import { activitiesRoutes } from "./modules/activities/activities.routes";

export const db = drizzle(process.env.DATABASE_URL!, { schema });

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
  .use(usersRoutes)
  .use(tasksRoutes)
  .use(tagsRoutes)
  .use(pipelineStagesRoutes)
  .use(leadsRoutes)
  .use(entityTagsRoutes)
  .use(contactsRoutes)
  .use(companiesRoutes)
  .use(activitiesRoutes);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
