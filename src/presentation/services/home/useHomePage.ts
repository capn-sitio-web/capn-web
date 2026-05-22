import { useQuery } from "@tanstack/react-query";
import { HomeService } from "./home.service";
import {
  mapBannerToHomeBanner,
  mapServiciosToHomeServices,
  mapCalidadToHomeQuality,
} from "./home.mapper";
import type { HomePageData } from "./home.types";

async function loadHomePage(): Promise<HomePageData> {
  const [bannerResult, servicesResult, qualityResult] =
    await Promise.allSettled([
      HomeService.getBanner(),
      HomeService.getNuestrosServicios(),
      HomeService.getCalidadCertificada(),
    ]);

  return {
    banner:
      bannerResult.status === "fulfilled"
        ? mapBannerToHomeBanner(bannerResult.value)
        : null,
    services:
      servicesResult.status === "fulfilled"
        ? mapServiciosToHomeServices(servicesResult.value)
        : null,
    quality:
      qualityResult.status === "fulfilled"
        ? mapCalidadToHomeQuality(qualityResult.value)
        : null,
  };
}

export function useHomePage() {
  const query = useQuery({
    queryKey: ["public", "home"],
    queryFn: loadHomePage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
