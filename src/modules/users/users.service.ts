import { db } from "../../index";
import { eq } from "drizzle-orm";
import { users, insertUserSchema, updateUserSchema } from "../../db/schema";
import { NotFoundError } from "elysia";

export const usersService = {
  getAll: async () => {
    return await db.query.users.findMany();
  },

  getById: async (id: string) => {
    const response = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    if (!response) throw new NotFoundError("User not found");

    return response;
  },

  create: async (user: typeof insertUserSchema.static) => {
    const [result] = await db.insert(users).values(user).returning();
    return result;
  },

  update: async (id: string, user: typeof updateUserSchema.static) => {
    const [result] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();

    if (!result) throw new NotFoundError("User not found");

    return result;
  },

  delete: async (id: string) => {
    const [result] = await db.delete(users).where(eq(users.id, id)).returning();

    if (!result) throw new NotFoundError("User not found");

    return null;
  },
};
