import { useQuery } from "@tanstack/react-query";
import { AboutService } from "./about.service";
import {
  mapBannerToAboutBanner,
  mapHistoriaToAboutHistory,
  mapMisionVisionToAboutCards,
  mapValoresToAboutCards,
  mapEquipoToAboutTeam,
} from "./about.mapper";
import type { AboutPageData } from "./about.types";

async function loadAboutPage(): Promise<AboutPageData> {
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

  return {
    banner:
      bannerResult.status === "fulfilled"
        ? mapBannerToAboutBanner(bannerResult.value)
        : null,
    history:
      historyResult.status === "fulfilled"
        ? mapHistoriaToAboutHistory(historyResult.value)
        : null,
    missionVision:
      missionVisionResult.status === "fulfilled"
        ? mapMisionVisionToAboutCards(missionVisionResult.value)
        : null,
    values:
      valuesResult.status === "fulfilled"
        ? mapValoresToAboutCards(valuesResult.value)
        : null,
    team:
      teamResult.status === "fulfilled"
        ? mapEquipoToAboutTeam(teamResult.value)
        : null,
  };
}

export function useAboutPage() {
  const query = useQuery({
    queryKey: ["public", "about"],
    queryFn: loadAboutPage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
