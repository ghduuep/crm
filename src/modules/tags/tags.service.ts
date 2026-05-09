import { tags } from "../../db/schema/index";
import { insertTagSchema, updateTagSchema } from "./tags.dto";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const tagsService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.tags.findMany({
      limit,
      offset,
    });

    const [{ count }] = await db.select({ count: sql`count(*)` }).from(tags);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
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
