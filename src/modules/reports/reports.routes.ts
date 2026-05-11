import { Elysia } from "elysia";
import { reportsService } from "./reports.service";

export const reportsRoutes = new Elysia({ prefix: "/reports" })
  .get("/pipeline", async () => reportsService.getPipelineReport())
  .get("/revenue", async () => reportsService.getRevenueReport())
  .get("/sales-performance", async () =>
    reportsService.getSalesPerformanceReport(),
  )
  .get("/tasks", async () => reportsService.getTasksReport());
