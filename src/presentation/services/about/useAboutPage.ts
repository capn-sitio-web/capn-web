import { useEffect, useState } from "react";
import { AboutService } from "./about.service";

import {
  mapBannerToAboutBanner,
  mapHistoriaToAboutHistory,
  mapMisionVisionToAboutCards,
  mapValoresToAboutCards,
  mapEquipoToAboutTeam,
} from "./about.mapper";

import { aboutFallbackData } from "./about.fallback";

import type { AboutPageData } from "./about.types";

export function useAboutPage() {
  const [data, setData] = useState<AboutPageData>(aboutFallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAboutPage() {
      setLoading(true);

      const [
        bannerResult,
        historyResult,
        missionVisionResult,
        valuesResult,
        teamResult,
      ] = await Promise.allSettled([
        AboutService.getBanner(),
        AboutService.getNuestraHistoria(),
        AboutService.getMisionYVision(),
        AboutService.getNuestrosValores(),
        AboutService.getNuestroEquipo(),
      ]);

      setData({
        banner:
          bannerResult.status === "fulfilled"
            ? mapBannerToAboutBanner(bannerResult.value)
            : aboutFallbackData.banner,

        history:
          historyResult.status === "fulfilled"
            ? mapHistoriaToAboutHistory(historyResult.value)
            : aboutFallbackData.history,

        missionVision:
          missionVisionResult.status === "fulfilled"
            ? mapMisionVisionToAboutCards(missionVisionResult.value)
            : aboutFallbackData.missionVision,

        values:
          valuesResult.status === "fulfilled"
            ? mapValoresToAboutCards(valuesResult.value)
            : aboutFallbackData.values,

        team:
          teamResult.status === "fulfilled"
            ? mapEquipoToAboutTeam(teamResult.value)
            : aboutFallbackData.team,
      });

      setLoading(false);
    }

    loadAboutPage();
  }, []);

  return {
    data,
    loading,
  };
}
