import {
  getFullImageUrl,
  mapIconNameToMui,
} from "../public.mapper";

import type {
  HomeBanner,
  HomeServices,
  HomeQuality,
  HomePageData,
  PublicBannerData,
  PublicSectionData,
  PublicHomePageResponse,
} from "./home.types";

export function mapBannerToHomeBanner(data: PublicBannerData): HomeBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

export function mapServiciosToHomeServices(
  data: PublicSectionData
): HomeServices {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? "",
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion,
    })),
  };
}

export function mapCalidadToHomeQuality(
  data: PublicSectionData
): HomeQuality {
  return {
    title: data.titulo,
    description: data.descripcion ?? "",
    image: getFullImageUrl(data.imagenes?.[0]?.imagen_url),
    items: data.listas.map((item) => item.texto_item),
  };
}

export function mapHomePageToHomePageData(
  data: PublicHomePageResponse["data"]
): HomePageData {
  return {
    banner: data.banner ? mapBannerToHomeBanner(data.banner) : null,

    services: data.nuestrosServicios
      ? mapServiciosToHomeServices(data.nuestrosServicios)
      : null,

    quality: data.calidadCertificada
      ? mapCalidadToHomeQuality(data.calidadCertificada)
      : null,
  };
}
