import { useEffect, useState } from "react";
import { HomeService } from "./home.service";
import {
  mapBannerToHomeBanner,
  mapServiciosToHomeServices,
  mapCalidadToHomeQuality,
} from "./home.mapper";

import type { HomeBanner, HomeServices, HomeQuality } from "./home.types";

type HomePageData = {
  banner: HomeBanner | null;
  services: HomeServices | null;
  quality: HomeQuality | null;
};

export function useHomePage() {
  const [data, setData] = useState<HomePageData>({
    banner: null,
    services: null,
    quality: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHomePage() {
      try {
        setLoading(true);

        const [banner, services, quality] = await Promise.all([
          HomeService.getBanner(),
          HomeService.getNuestrosServicios(),
          HomeService.getCalidadCertificada(),
        ]);

        setData({
          banner: mapBannerToHomeBanner(banner),
          services: mapServiciosToHomeServices(services),
          quality: mapCalidadToHomeQuality(quality),
        });
      } catch (error) {
        console.error("Error al cargar la página de inicio:", error);
        setError("No se pudo cargar la información de inicio.");
      } finally {
        setLoading(false);
      }
    }

    loadHomePage();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
