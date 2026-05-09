import { desc, eq, sql } from "drizzle-orm";
import { leads, entityTags } from "../../db/schema/index";
import { insertLeadSchema, updateLeadSchema } from "./leads.dto";
import { db } from "../../db";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { NotFoundError } from "elysia";

export const leadsService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.leads.findMany({
      orderBy: desc(leads.createdAt),
      with: {
        company: true,
        contact: true,
        owner: true,
        stage: true,
      },
      limit,
      offset,
    });

    const [{ count }] = await db.select({ count: sql`count(*)` }).from(leads);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
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
