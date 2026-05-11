import Elysia from "elysia";
import { reportsService } from "./reports.service";
import { betterAuth } from "../../utils/better-auth";

export const reportsRoutes = new Elysia({ prefix: "/reports" })
  .use(betterAuth)
  .get("/pipeline", async () => reportsService.getPipelineReport(), {
    auth: true,
    detail: {
      summary: "Get pipeline report",
      tags: ["reports"],
    },
  })
  .get("/revenue", async () => reportsService.getRevenueReport(), {
    auth: true,
    detail: {
      summary: "Get revenue report",
      tags: ["reports"],
    },
  })
  .get(
    "/sales-performance",
    async () => reportsService.getSalesPerformanceReport(),
    {
      auth: true,
      detail: {
        summary: "Get sales perfomance report",
        tags: ["reports"],
      },
    },
  )
  .get("/tasks", async () => reportsService.getTasksReport(), {
    auth: true,
    detail: {
      summary: "Get tasks report",
      tags: ["reports"],
    },
  });
