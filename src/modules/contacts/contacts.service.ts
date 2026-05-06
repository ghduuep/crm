import { eq } from "drizzle-orm";
import {
  contacts,
  insertContactSchema,
  updateContactSchema,
} from "../../db/schema";
import { db } from "../../index";
import { NotFoundError } from "elysia";

export const contactsService = {
  getAll: async () => {
    return await db.query.contacts.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.contacts.findFirst({
      where: (contacts, { eq }) => eq(contacts.id, id),
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
