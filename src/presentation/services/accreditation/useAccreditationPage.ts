import { useEffect, useState } from "react";

import { AccreditationService } from "./accreditation.service";
import { accreditationFallbackData } from "./accreditation.fallback";

import {
  mapBannerToAccreditationBanner,
  mapSistemaCalidadToCards,
} from "./accreditation.mapper";

import type {
  AccreditationPageData,
  AccreditationQualityItem,
  AccreditationSectionGroup,
} from "./accreditation.types";

function mergeSistemaCalidadWithFallback(
  mapped: AccreditationSectionGroup<AccreditationQualityItem>,
  fallback: AccreditationSectionGroup<AccreditationQualityItem>
): AccreditationSectionGroup<AccreditationQualityItem> {
  return {
    ...fallback,
    ...mapped,
    items: mapped.items.length > 0 ? mapped.items : fallback.items,
  };
}

export function useAccreditationPage() {
  const [data, setData] = useState<AccreditationPageData>(
    accreditationFallbackData
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccreditationPage() {
      setLoading(true);

      const [bannerResult, sistemaCalidadResult] = await Promise.allSettled([
        AccreditationService.getBanner(),
        AccreditationService.getSistemaCalidad(),
      ]);

      const mappedBanner =
        bannerResult.status === "fulfilled"
          ? mapBannerToAccreditationBanner(bannerResult.value)
          : accreditationFallbackData.banner;

      const mappedSistemaCalidad =
        sistemaCalidadResult.status === "fulfilled"
          ? mapSistemaCalidadToCards(sistemaCalidadResult.value)
          : accreditationFallbackData.sistemaCalidad;

      setData({
        banner: {
          ...accreditationFallbackData.banner,
          ...mappedBanner,
          image:
            mappedBanner.image || accreditationFallbackData.banner.image,
        },

        sistemaCalidad: mergeSistemaCalidadWithFallback(
          mappedSistemaCalidad,
          accreditationFallbackData.sistemaCalidad
        ),

        cta: accreditationFallbackData.cta,
      });

      setLoading(false);
    }

    loadAccreditationPage();
  }, []);

  return {
    data,
    loading,
  };
}
