import { mapIconNameToMui } from "../public.mapper";

import type {
  PublicBannerData,
  PublicSectionData,
} from "../public.types";

import type {
  AccreditationBanner,
  AccreditationQualityItem,
  AccreditationSectionGroup,
  AccreditationPageData,
  PublicAccreditationPageResponse,
} from "./accreditation.types";

export function mapBannerToAccreditationBanner(
  data: PublicBannerData
): AccreditationBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

export function mapSistemaCalidadToCards(
  data: PublicSectionData
): AccreditationSectionGroup<AccreditationQualityItem> {
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

export function mapAccreditationPageToAccreditationPageData(
  data: PublicAccreditationPageResponse["data"]
): AccreditationPageData {
  return {
    banner: data.banner ? mapBannerToAccreditationBanner(data.banner) : null,
    sistemaCalidad: data.sistemaCalidad
      ? mapSistemaCalidadToCards(data.sistemaCalidad)
      : null,
  };
}
