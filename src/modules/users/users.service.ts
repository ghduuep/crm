import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users, insertUserSchema, updateUserSchema } from "../../db/schema/index";
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
    try {
      const [result] = await db.insert(users).values(user).returning();
      return result;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error("Email already exists");
      }
      throw err;
    }
  },

  update: async (id: string, user: typeof updateUserSchema.static) => {
    try {
      const [result] = await db
        .update(users)
        .set(user)
        .where(eq(users.id, id))
        .returning();

      if (!result) throw new NotFoundError("User not found");

      return result;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error("Email already exists");
      }
      throw err;
    }
  },

  delete: async (id: string) => {
    const [result] = await db.delete(users).where(eq(users.id, id)).returning();

    if (!result) throw new NotFoundError("User not found");

    return null;
  },
};
