import { eq, sql } from "drizzle-orm";
import { contacts } from "../../db/schema/index";
import { insertContactSchema, updateContactSchema } from "./contacts.dto";
import { db } from "../../db";
import {
  normalizePagination,
  buildPaginatedResponse,
  Pagination,
} from "../../utils/pagination";
import { NotFoundError } from "elysia";

export const contactsService = {
  getAll: async (pagination: Pagination, baseUrl: string) => {
    const { limit, offset } = normalizePagination(pagination);

    const data = await db.query.contacts.findMany({
      with: {
        company: true,
      },
      limit,
      offset,
    });

    const [{ count }] = await db
      .select({ count: sql`count(*)` })
      .from(contacts);
    const total = Number((count as any) ?? 0);

    return buildPaginatedResponse(data, total, limit, offset, baseUrl);
  },
  getById: async (id: string) => {
    const response = await db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.id, id),
      with: {
        company: true,
      },
    });

    if (!response) throw new NotFoundError("Contact not found");

    return response;
  },
  create: async (contact: typeof insertContactSchema.static) => {
    const [response] = await db.insert(contacts).values(contact).returning();

    return response;
  },
  update: async (id: string, contact: typeof updateContactSchema.static) => {
    const [response] = await db
      .update(contacts)
      .set(contact)
      .where(eq(contacts.id, id))
      .returning();

    if (!response) throw new NotFoundError("Contact not found");

    return response;
  },
  delete: async (id: string) => {
    const [response] = await db
      .delete(contacts)
      .where(eq(contacts.id, id))
      .returning();

    if (!response) throw new NotFoundError("Contact not found");

    return null;
  },
};
