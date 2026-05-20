import { useEffect, useState } from "react";
import { HomeService } from "./home.service";

import {
  mapBannerToHomeBanner,
  mapServiciosToHomeServices,
  mapCalidadToHomeQuality,
} from "./home.mapper";

import { homeFallbackData } from "./home.fallback";
import type { HomePageData } from "./home.types";

export function useHomePage() {
  const [data, setData] = useState<HomePageData>(homeFallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomePage() {
      setLoading(true);

      const [bannerResult, servicesResult, qualityResult] =
        await Promise.allSettled([
          HomeService.getBanner(),
          HomeService.getNuestrosServicios(),
          HomeService.getCalidadCertificada(),
        ]);

      const mappedBanner =
        bannerResult.status === "fulfilled"
          ? mapBannerToHomeBanner(bannerResult.value)
          : homeFallbackData.banner;

      const mappedServices =
        servicesResult.status === "fulfilled"
          ? mapServiciosToHomeServices(servicesResult.value)
          : homeFallbackData.services;

      const mappedQuality =
        qualityResult.status === "fulfilled"
          ? mapCalidadToHomeQuality(qualityResult.value)
          : homeFallbackData.quality;

      setData({
        banner: {
          ...homeFallbackData.banner,
          ...mappedBanner,
          image: mappedBanner.image || homeFallbackData.banner.image,
        },

        services: {
          ...homeFallbackData.services,
          ...mappedServices,
          items:
            mappedServices.items.length > 0
              ? mappedServices.items
              : homeFallbackData.services.items,
        },

        quality: {
          ...homeFallbackData.quality,
          ...mappedQuality,
          image: mappedQuality.image || homeFallbackData.quality.image,
          items:
            mappedQuality.items.length > 0
              ? mappedQuality.items
              : homeFallbackData.quality.items,
        },

        stats: homeFallbackData.stats,
        clients: homeFallbackData.clients,
        cta: homeFallbackData.cta,
      });

      setLoading(false);
    }

    loadHomePage();
  }, []);

  return {
    data,
    loading,
  };
}
