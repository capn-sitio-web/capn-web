import { useEffect, useState } from "react";

import { ServicesService } from "./services.service";
import { servicesFallbackData } from "./services.fallback";

import {
  mapBannerToServicesBanner,
  mapSectionToServiceInfo,
  mapSectionToCardGroup,
} from "./services.mapper";

import type {
  ServiceInfoSection,
  ServiceCardItem,
  ServicesSectionGroup,
  ServicesPageData,
} from "./services.types";

function mergeServiceInfoWithFallback(
  mapped: ServiceInfoSection,
  fallback: ServiceInfoSection
): ServiceInfoSection {
  return {
    ...fallback,
    ...mapped,
    image: mapped.image || fallback.image,
    items: mapped.items.length > 0 ? mapped.items : fallback.items,
  };
}

function mergeCardGroupWithFallback(
  mapped: ServicesSectionGroup<ServiceCardItem>,
  fallback: ServicesSectionGroup<ServiceCardItem>
): ServicesSectionGroup<ServiceCardItem> {
  return {
    ...fallback,
    ...mapped,
    items: mapped.items.length > 0 ? mapped.items : fallback.items,
  };
}

export function useServicesPage() {
  const [data, setData] = useState<ServicesPageData>(servicesFallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServicesPage() {
      setLoading(true);

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

      const mappedBanner =
        bannerResult.status === "fulfilled"
          ? mapBannerToServicesBanner(bannerResult.value)
          : servicesFallbackData.banner;

      const mappedMicrobiologico =
        microbiologicoResult.status === "fulfilled"
          ? mapSectionToServiceInfo(microbiologicoResult.value)
          : servicesFallbackData.microbiologico;

      const mappedFisicoquimico =
        fisicoquimicoResult.status === "fulfilled"
          ? mapSectionToServiceInfo(fisicoquimicoResult.value)
          : servicesFallbackData.fisicoquimico;

      const mappedSensorial =
        sensorialResult.status === "fulfilled"
          ? mapSectionToServiceInfo(sensorialResult.value)
          : servicesFallbackData.sensorial;

      const mappedEspecializado =
        especializadoResult.status === "fulfilled"
          ? mapSectionToServiceInfo(especializadoResult.value)
          : servicesFallbackData.especializado;

      const mappedProcesoTrabajo =
        procesoTrabajoResult.status === "fulfilled"
          ? mapSectionToCardGroup(procesoTrabajoResult.value)
          : servicesFallbackData.procesoTrabajo;

      const mappedEquiposTecnologia =
        equiposTecnologiaResult.status === "fulfilled"
          ? mapSectionToCardGroup(equiposTecnologiaResult.value)
          : servicesFallbackData.equiposTecnologia;

      setData({
        banner: {
          ...servicesFallbackData.banner,
          ...mappedBanner,
          image: mappedBanner.image || servicesFallbackData.banner.image,
        },

        microbiologico: mergeServiceInfoWithFallback(
          mappedMicrobiologico,
          servicesFallbackData.microbiologico
        ),

        fisicoquimico: mergeServiceInfoWithFallback(
          mappedFisicoquimico,
          servicesFallbackData.fisicoquimico
        ),

        sensorial: mergeServiceInfoWithFallback(
          mappedSensorial,
          servicesFallbackData.sensorial
        ),

        especializado: mergeServiceInfoWithFallback(
          mappedEspecializado,
          servicesFallbackData.especializado
        ),

        procesoTrabajo: mergeCardGroupWithFallback(
          mappedProcesoTrabajo,
          servicesFallbackData.procesoTrabajo
        ),

        equiposTecnologia: mergeCardGroupWithFallback(
          mappedEquiposTecnologia,
          servicesFallbackData.equiposTecnologia
        ),

        cta: servicesFallbackData.cta,
      });

      setLoading(false);
    }

    loadServicesPage();
  }, []);

  return {
    data,
    loading,
  };
}
