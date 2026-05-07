import { eq } from "drizzle-orm";
import { leads, entityTags } from "../../db/schema/index";
import { insertLeadSchema, updateLeadSchema } from "./leads.dto";
import { db } from "../../db";
import { NotFoundError } from "elysia";

export const leadsService = {
  getAll: async () => {
    return await db.query.leads.findMany({
      with: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
      },
    });
  },
  getById: async (id: string) => {
    const response = await db.query.leads.findFirst({
      where: (leads, { eq }) => eq(leads.id, id),
      with: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
        activities: true,
        tasks: true,
        tags: {
          with: {
            tag: true,
          },
          where: eq(entityTags.entityType, "lead"),
        },
      },
    });

    if (!response) throw new NotFoundError("Lead not found");

    return response;
  },
  create: async (lead: typeof insertLeadSchema.static) => {
    const [response] = await db.insert(leads).values(lead).returning();

    return response;
  },
  update: async (id: string, lead: typeof updateLeadSchema.static) => {
    const [response] = await db
      .update(leads)
      .set(lead)
      .where(eq(leads.id, id))
      .returning();

    if (!response) throw new NotFoundError("Lead not found");

    return response;
  },
  delete: async (id: string) => {
    const [response] = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    if (!response) throw new NotFoundError("Lead not found");

    return null;
  },
};
