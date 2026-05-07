import { eq } from "drizzle-orm";
import {
  companies,
  insertCompanySchema,
  updateCompanySchema,
} from "../../db/schema";
import { db } from "../../db";
import { NotFoundError } from "elysia";

export const companiesService = {
  getAll: async () => {
    return await db.query.companies.findMany();
  },
  getById: async (id: string) => {
    const response = await db.query.companies.findFirst({
      where: (companies, { eq }) => eq(companies.id, id),
    });

    if (!response) throw new NotFoundError("Company not found");

    return response;
  },
  create: async (company: typeof insertCompanySchema.static) => {
    try {
      const [response] = await db.insert(companies).values(company).returning();

      return response;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error("Document already exists");
      }
      throw err;
    }
  },
  update: async (id: string, company: typeof updateCompanySchema.static) => {
    try {
      const [response] = await db
        .update(companies)
        .set(company)
        .where(eq(companies.id, id))
        .returning();

      if (!response) throw new NotFoundError("Company not found");

      return response;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new Error("Document already exists");
      }
      throw err;
    }
  },
  delete: async (id: string) => {
    const [response] = await db
      .delete(companies)
      .where(eq(companies.id, id))
      .returning();

    if (!response) throw new NotFoundError("Company not found");

    return null;
  },
};
