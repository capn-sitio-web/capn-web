import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "./services.service";
import {
  mapBannerToServicesBanner,
  mapSectionToServiceInfo,
  mapSectionToCardGroup,
} from "./services.mapper";
import type { ServicesPageData } from "./services.types";

async function loadServicesPage(): Promise<ServicesPageData> {
  const [
    bannerResult,
    microbiologicoResult,
    fisicoquimicoResult,
    sensorialResult,
    especializadoResult,
    procesoTrabajoResult,
    equiposTecnologiaResult,
  ] = await Promise.allSettled([
    ServicesService.getBanner(),
    ServicesService.getAnalisisMicrobiologico(),
    ServicesService.getAnalisisFisicoquimico(),
    ServicesService.getAnalisisSensorial(),
    ServicesService.getAnalisisEspecializado(),
    ServicesService.getProcesoTrabajo(),
    ServicesService.getEquiposTecnologia(),
  ]);

  return {
    banner:
      bannerResult.status === "fulfilled"
        ? mapBannerToServicesBanner(bannerResult.value)
        : null,

    microbiologico:
      microbiologicoResult.status === "fulfilled"
        ? mapSectionToServiceInfo(microbiologicoResult.value)
        : null,

    fisicoquimico:
      fisicoquimicoResult.status === "fulfilled"
        ? mapSectionToServiceInfo(fisicoquimicoResult.value)
        : null,

    sensorial:
      sensorialResult.status === "fulfilled"
        ? mapSectionToServiceInfo(sensorialResult.value)
        : null,

    especializado:
      especializadoResult.status === "fulfilled"
        ? mapSectionToServiceInfo(especializadoResult.value)
        : null,

    procesoTrabajo:
      procesoTrabajoResult.status === "fulfilled"
        ? mapSectionToCardGroup(procesoTrabajoResult.value)
        : null,

    equiposTecnologia:
      equiposTecnologiaResult.status === "fulfilled"
        ? mapSectionToCardGroup(equiposTecnologiaResult.value)
        : null,
  };
}

export function useServicesPage() {
  const query = useQuery({
    queryKey: ["public", "services"],
    queryFn: loadServicesPage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
