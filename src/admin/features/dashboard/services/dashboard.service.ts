import { axiosClient } from "../../../config/axiosClient";
import type { DashboardRange, DashboardSummaryResponse } from "./dashboard.types";

export const dashboardService = {
  async obtenerResumen(range: DashboardRange): Promise<DashboardSummaryResponse> {
    const response = await axiosClient.get<DashboardSummaryResponse>(
      `/admin/dashboard/summary?range=${range}`
    );

    return response.data;
  },

  async eliminarVisitasAntiguas(): Promise<{ message: string; deleted: number }> {
    const response = await axiosClient.delete<{ message: string; deleted: number }>(
      "/admin/dashboard/site-visits/old"
    );

    return response.data;
  },
};
