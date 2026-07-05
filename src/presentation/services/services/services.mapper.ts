import { mapIconNameToMui } from "../public.mapper";
import type { PublicBannerData, PublicSectionData } from "../public.types";

import type {
  ServicesBanner,
  ServiceInfoSection,
  ServiceCardItem,
  ServicesSectionGroup,
  ServicesPageData,
  PublicServicesPageResponse,
  ServiceDetail,
} from "./services.types";

export function mapBannerToServicesBanner(
  data: PublicBannerData
): ServicesBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

export function mapSectionToServiceInfo(
  data: PublicSectionData
): ServiceInfoSection {
  return {
    slug: data.slug,
    title: data.titulo,
    description: data.descripcion ?? "",
    image: data.image?.previewUrl ?? "",
    imageAlt: data.image?.alt ?? data.titulo,
    items: data.listas.map((item) => item.texto_item),
  };
}

export function mapSectionToCardGroup(
  data: PublicSectionData
): ServicesSectionGroup<ServiceCardItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion ?? "",
    })),
  };
}

export function mapServicesPageToServicesPageData(
  data: PublicServicesPageResponse["data"]
): ServicesPageData {
  return {
    banner: data.banner ? mapBannerToServicesBanner(data.banner) : null,

    microbiologico: data.analisisMicrobiologico
      ? mapSectionToServiceInfo(data.analisisMicrobiologico)
      : null,

    fisicoquimico: data.analisisFisicoquimico
      ? mapSectionToServiceInfo(data.analisisFisicoquimico)
      : null,

    sensorial: data.analisisSensorial
      ? mapSectionToServiceInfo(data.analisisSensorial)
      : null,

    especializado: data.analisisEspecializado
      ? mapSectionToServiceInfo(data.analisisEspecializado)
      : null,

    procesoTrabajo: data.procesoTrabajo
      ? mapSectionToCardGroup(data.procesoTrabajo)
      : null,

    equiposTecnologia: data.equiposTecnologia
      ? mapSectionToCardGroup(data.equiposTecnologia)
      : null,
  };
}

export function mapServiceSectionToServiceDetail(
  data: PublicSectionData
): ServiceDetail {
  return {
    slug: data.slug,
    title: data.titulo,
    date: "",
    category: "Servicio",
    image: data.image?.previewUrl ?? "",
    imageAlt: data.image?.alt ?? data.titulo,
    content: data.contenido_extenso ?? data.descripcion ?? "",
    gallery: data.galleryImages?.map((image) => image.previewUrl) ?? [],
  };
}
