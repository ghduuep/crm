import { desc, eq, sql } from "drizzle-orm";
import { activities } from "../../db/schema/index";
import { insertActivitySchema, updateActivitySchema } from "./activities.dto";
import { db } from "../../db";
import { InternalServerError, NotFoundError } from "elysia";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";

export const activitiesService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.activities.findMany({
      orderBy: desc(activities.createdAt),
      with: {
        lead: true,
        contact: true,
        user: true,
      },
      limit: limit,
      offset: offset,
    });

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(activities);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
  },
  getById: async (id: string) => {
    const activity = await db.query.activities.findFirst({
      where: (activities, { eq }) => eq(activities.id, id),
      with: {
        lead: true,
        contact: true,
        user: true,
      },
    });

    if (!activity) throw new NotFoundError("Activity not found");

    return activity;
  },
  create: async (activity: typeof insertActivitySchema.static) => {
    const [response] = await db.insert(activities).values(activity).returning();

    return response;
  },
  update: async (id: string, activity: typeof updateActivitySchema.static) => {
    const [response] = await db
      .update(activities)
      .set(activity)
      .where(eq(activities.id, id))
      .returning();

    if (!response) throw new NotFoundError("Activity not found");

    return response;
  },
  delete: async (id: string) => {
    const [response] = await db
      .delete(activities)
      .where(eq(activities.id, id))
      .returning();

    if (!response) throw new NotFoundError("Activity not found");

    return null;
  },
};
