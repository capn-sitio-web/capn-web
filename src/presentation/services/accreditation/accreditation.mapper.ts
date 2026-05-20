import type {
  PublicBannerData,
  PublicSectionData,
} from "../public.types";

import { mapIconNameToMui } from "../public.mapper";

import type {
  AccreditationBanner,
  AccreditationQualityItem,
  AccreditationSectionGroup,
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
