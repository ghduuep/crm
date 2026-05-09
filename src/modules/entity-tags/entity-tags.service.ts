import { entityTags } from "../../db/schema/index";
import {
  insertEntityTagSchema,
  updateEntityTagSchema,
} from "./entity-tags.dto";
import { db } from "../../db";
import { sql } from "drizzle-orm";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { desc, eq } from "drizzle-orm";
import { NotFoundError } from "elysia";

export const entityTagsService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.entityTags.findMany({
      orderBy: desc(entityTags.entityType),
      limit,
      offset,
    });

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(entityTags);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
  },
  getById: async (id: string) => {
    const response = await db.query.entityTags.findFirst({
      where: (entityTags, { eq }) => eq(entityTags.id, id),
    });

    if (!response) throw new NotFoundError("Entity tag not found");

    return response;
  },
  create: async (tag: typeof insertEntityTagSchema.static) => {
    const [response] = await db.insert(entityTags).values(tag).returning();

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
