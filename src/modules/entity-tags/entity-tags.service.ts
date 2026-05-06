import {
  entityTags,
  insertEntityTagSchema,
  updateEntityTagSchema,
} from "../../db/schema";
import { db } from "../../index";
import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const entityTagsService = {
  getAll: async () => {
    return await db.query.entityTags.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.entityTags.findFirst({
      where: (entityTags, { eq }) => eq(entityTags.id, id),
    });

    if (!response) throw new NotFoundError("Entity tag not found");

    return response;
  },
  create: async (tag: typeof insertEntityTagSchema.static) => {
    const response = await db.insert(entityTags).values(tag).returning();

    return response;
  },
  update: async (id: string, tag: typeof updateEntityTagSchema.static) => {
    const [response] = await db
      .update(entityTags)
      .set(tag)
      .where(eq(entityTags.id, id))
      .returning();

    if (!response) throw new NotFoundError("Entity tag not found");

    return response;
  },
  delete: async (id: string) => {
    const [response] = await db
      .delete(entityTags)
      .where(eq(entityTags.id, id))
      .returning();

    if (!response) throw new NotFoundError("Entity tag not found");

    return null;
  },
};
