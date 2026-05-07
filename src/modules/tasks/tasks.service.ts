import { eq } from "drizzle-orm";
import { tasks, insertTaskSchema, updateTaskSchema } from "../../db/schema";
import { db } from "../../db";
import { NotFoundError } from "elysia";

export const tasksService = {
  getAll: async () => {
    return await db.query.tasks.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.tasks.findFirst({
      where: (tasks, { eq }) => eq(tasks.id, id),
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
