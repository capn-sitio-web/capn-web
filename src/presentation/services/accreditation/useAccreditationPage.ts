import { useQuery } from "@tanstack/react-query";
import { AccreditationService } from "./accreditation.service";
import {
  mapBannerToAccreditationBanner,
  mapSistemaCalidadToCards,
} from "./accreditation.mapper";
import type { AccreditationPageData } from "./accreditation.types";

async function loadAccreditationPage(): Promise<AccreditationPageData> {
  const [bannerResult, sistemaCalidadResult] = await Promise.allSettled([
    AccreditationService.getBanner(),
    AccreditationService.getSistemaCalidad(),
  ]);

  return {
    banner:
      bannerResult.status === "fulfilled"
        ? mapBannerToAccreditationBanner(bannerResult.value)
        : null,

    sistemaCalidad:
      sistemaCalidadResult.status === "fulfilled"
        ? mapSistemaCalidadToCards(sistemaCalidadResult.value)
        : null,
  };
}

export function useAccreditationPage() {
  const query = useQuery({
    queryKey: ["public", "accreditation"],
    queryFn: loadAccreditationPage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
