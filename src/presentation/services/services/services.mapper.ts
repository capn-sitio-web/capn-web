import type {
  PublicBannerData,
  PublicSectionData,
} from "../public.types";

import {
  getFullImageUrl,
  mapIconNameToMui,
} from "../public.mapper";

import type {
  ServicesBanner,
  ServiceInfoSection,
  ServiceCardItem,
  ServicesSectionGroup,
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
    title: data.titulo,
    description: data.descripcion ?? "",
    image: getFullImageUrl(data.imagenes?.[0]?.imagen_url),
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
      description: item.descripcion,
    })),
  };
}
