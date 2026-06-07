import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "./dashboard.service";
import type { DashboardRange } from "./dashboard.types";

export function useDashboardSummary(range: DashboardRange) {
  return useQuery({
    queryKey: ["dashboard-summary", range],
    queryFn: () => dashboardService.obtenerResumen(range),
  });
}
