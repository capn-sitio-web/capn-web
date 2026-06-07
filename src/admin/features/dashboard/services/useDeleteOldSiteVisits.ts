import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "./dashboard.service";

export function useDeleteOldSiteVisits() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dashboardService.eliminarVisitasAntiguas(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-summary"],
      });
    },
  });
}
