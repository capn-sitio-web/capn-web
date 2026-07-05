import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "./services.service";
import { mapServiceSectionToServiceDetail } from "./services.mapper";
import type { ServiceDetail } from "./services.types";

async function loadServiceDetail(slug: string): Promise<ServiceDetail> {
  const serviceDetailData = await ServicesService.getServiceDetail(slug);
  return mapServiceSectionToServiceDetail(serviceDetailData);
}

export function useServiceDetail(slug: string | null) {
  const query = useQuery({
    queryKey: ["public", "service-detail", slug],
    queryFn: () => loadServiceDetail(slug as string),
    enabled: !!slug,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
