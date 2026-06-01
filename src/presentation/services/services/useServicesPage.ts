import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "./services.service";
import { mapServicesPageToServicesPageData } from "./services.mapper";
import type { ServicesPageData } from "./services.types";

async function loadServicesPage(): Promise<ServicesPageData> {
  const servicesPageData = await ServicesService.getServicesPage();
  return mapServicesPageToServicesPageData(servicesPageData);
}

export function useServicesPage() {
  const query = useQuery({
    queryKey: ["public", "services"],
    queryFn: loadServicesPage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
