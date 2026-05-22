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
  const [banner, history, missionVision, values, team] = await Promise.all([
    AboutService.getBanner(),
    AboutService.getNuestraHistoria(),
    AboutService.getMisionYVision(),
    AboutService.getNuestrosValores(),
    AboutService.getNuestroEquipo(),
  ]);

  return {
    banner: mapBannerToAboutBanner(banner),
    history: mapHistoriaToAboutHistory(history),
    missionVision: mapMisionVisionToAboutCards(missionVision),
    values: mapValoresToAboutCards(values),
    team: mapEquipoToAboutTeam(team),
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
