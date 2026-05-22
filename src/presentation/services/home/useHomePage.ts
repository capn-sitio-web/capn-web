import { useQuery } from "@tanstack/react-query";

import { HomeService } from "./home.service";

import {
  mapBannerToHomeBanner,
  mapServiciosToHomeServices,
  mapCalidadToHomeQuality,
} from "./home.mapper";

import type { HomePageData } from "./home.types";

async function loadHomePage(): Promise<HomePageData> {
  const [banner, services, quality] = await Promise.all([
    HomeService.getBanner(),
    HomeService.getNuestrosServicios(),
    HomeService.getCalidadCertificada(),
  ]);

  return {
    banner: mapBannerToHomeBanner(banner),
    services: mapServiciosToHomeServices(services),
    quality: mapCalidadToHomeQuality(quality),
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
