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
import { NotFoundError } from "elysia";

export const db = drizzle(process.env.DATABASE_URL!, { schema });

const app = new Elysia()
  .onError(({ error, code, set }) => {
    if (error instanceof NotFoundError) {
      set.status = 404;
      return { message: error.message };
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
