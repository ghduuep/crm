import { eq } from "drizzle-orm";
import {
  activities,
  insertActivitySchema,
  updateActivitySchema,
} from "../../db/schema/index";
import { db } from "../../db";
import { InternalServerError, NotFoundError } from "elysia";

export const activitiesService = {
  getAll: async () => {
    return await db.query.activities.findMany({
      with: {
        lead: true,
        contact: true,
        user: true,
      },
    });
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
