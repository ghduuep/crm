import { eq, sql } from "drizzle-orm";
import { tasks } from "../../db/schema/index";
import { insertTaskSchema, updateTaskSchema } from "./tasks.dto";
import { db } from "../../db";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { NotFoundError } from "elysia";

export const tasksService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.tasks.findMany({
      with: {
        lead: true,
        contact: true,
        assignedTo: true,
      },
      limit,
      offset,
    });

    const [{ count }] = await db.select({ count: sql`count(*)` }).from(tasks);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
  },
  getById: async (id: string) => {
    const response = await db.query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, id),
      with: {
        lead: true,
        contact: true,
        assignedTo: true,
      },
    });

    if (!response) throw new NotFoundError("Task not found");

    return response;
  },
  create: async (task: typeof insertTaskSchema.static) => {
    const [result] = await db.insert(tasks).values(task).returning();
    return result;
  },
  update: async (id: string, task: typeof updateTaskSchema.static) => {
    const [result] = await db
      .update(tasks)
      .set(task)
      .where(eq(tasks.id, id))
      .returning();

    if (!result) throw new NotFoundError("Task not found");

    return result;
  },
  delete: async (id: string) => {
    const [result] = await db.delete(tasks).where(eq(tasks.id, id)).returning();

    if (!result) throw new NotFoundError("Task not found");

    return null;
  },
};
