import { count, desc, eq, sql, sum } from "drizzle-orm";
import { db } from "../../db/index";
import { leads, pipelineStages, tasks, users } from "../../db/schema/index";

export const reportsService = {
  getPipelineReport: async () => {
    const allLeads = await db.select().from(leads);
    const stages = await db
      .select()
      .from(pipelineStages)
      .orderBy(pipelineStages.position);

    return stages.map((stage) => ({
      ...stage,
      leads: allLeads.filter((lead) => lead.stageId === stage.id),
    }));
  },
  getRevenueReport: async () => {
    return await db
      .select({
        wonLeads: leads,
        totalRevenue: sum(leads.value),
      })
      .from(leads)
      .groupBy(leads.id, leads.title)
      .orderBy(leads.value);
  },
  getSalesPerformanceReport: async () => {
    return await db
      .select({
        salesperson: users.name,
        totalLeads: count(leads.id),
        wonLeads: sum(
          sql<number>`CASE WHEN ${leads.status} = 'won' THEN 1 ELSE 0 END`,
        ).mapWith(Number),
        lostLeads: sum(
          sql<number>`CASE WHEN ${leads.status} = 'lost' THEN 1 ELSE 0 END`,
        ).mapWith(Number),
        totalRevenue: sum(
          sql<number>`CASE WHEN ${leads.status} = 'won' THEN ${leads.value} ELSE 0 END`,
        ).mapWith(Number),
        totalRevenueLost: sum(
          sql<number>`CASE WHEN ${leads.status} = 'lost' THEN ${leads.value} ELSE 0 END`,
        ).mapWith(Number),
      })
      .from(leads)
      .leftJoin(users, eq(leads.ownerId, users.id))
      .groupBy(users.id, users.name);
  },
  getTasksReport: async () => {
    return await db
      .select({
        totalTasks: count(tasks),
        overdueTasks: sum(sql<number>`
              CASE
                WHEN ${tasks.status} IN ('in_progress','pending') AND ${tasks.dueDate} < CURRENT_TIMESTAMP
                THEN 1 ELSE 0
              END
            `).mapWith(Number),
        completedTasks: sum(
          sql<number>`CASE WHEN ${tasks.status} = 'done' THEN 1 ELSE 0 END`,
        ).mapWith(Number),
      })
      .from(tasks)
      .leftJoin(users, eq(tasks.assignedTo, users.id))
      .groupBy(users.id, users.name)
      .orderBy(desc(count(tasks)));
  },
};
