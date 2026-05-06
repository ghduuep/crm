import { eq } from "drizzle-orm";
import {
  companies,
  insertCompanySchema,
  updateCompanySchema,
} from "../../db/schema";
import { db } from "../../index";
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
    const [response] = await db.insert(companies).values(company).returning();

    return response;
  },
  update: async (id: string, company: typeof updateCompanySchema.static) => {
    const [response] = await db
      .update(companies)
      .set(company)
      .where(eq(companies.id, id))
      .returning();

    if (!response) throw new NotFoundError("Company not found");

    return response;
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
