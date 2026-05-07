import { tags, insertTagSchema, updateTagSchema } from "../../db/schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const tagsService = {
  getAll: async () => {
    return await db.query.tags.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.tags.findFirst({
      where: (tags, { eq }) => eq(tags.id, id),
    });

    if (!response) throw new NotFoundError("Tag not found");

    return response;
  },
  create: async (tag: typeof insertTagSchema.static) => {
    const [result] = await db.insert(tags).values(tag).returning();
    return result;
  },
  update: async (id: string, tag: typeof updateTagSchema.static) => {
    const [response] = await db
      .update(tags)
      .set(tag)
      .where(eq(tags.id, id))
      .returning();

    if (!response) throw new NotFoundError("Tag not found");

    return response;
  },
  delete: async (id: string) => {
    const [response] = await db.delete(tags).where(eq(tags.id, id)).returning();

    if (!response) throw new NotFoundError("Tag not found");

    return null;
  },
};
