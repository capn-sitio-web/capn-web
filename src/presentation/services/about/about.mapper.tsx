import {
  mapIconNameToMui,
} from "../public.mapper";

import type { PublicSectionData } from "../public.types";

import type {
  AboutBanner,
  AboutHistory,
  AboutCardItem,
  AboutTeamItem,
  AboutSectionGroup,
  AboutPageData,
  PublicAboutPageResponse,
} from "./about.types";

export function mapBannerToAboutBanner(data: {
  sectionTitle: string;
  description: string;
  image: {
    previewUrl: string;
    alt: string;
  } | null;
}): AboutBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

export function mapHistoriaToAboutHistory(
  data: PublicSectionData
): AboutHistory {
  return {
    title: data.titulo,
    description: data.descripcion ?? "",
    image: data.image?.previewUrl ?? "",
  };
}

export function mapMisionVisionToAboutCards(
  data: PublicSectionData
): AboutSectionGroup<AboutCardItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion ?? "",
      txtAlign: "left",
    })),
  };
}

export function mapValoresToAboutCards(
  data: PublicSectionData
): AboutSectionGroup<AboutCardItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion ?? "",
      txtAlign: "center",
    })),
  };
}

export function mapEquipoToAboutTeam(
  data: PublicSectionData
): AboutSectionGroup<AboutTeamItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: (data.personal ?? []).map((person) => ({
      image: person.foto_url ?? "",
      title: person.nombre,
      subtitle: person.cargo,
      description: person.descripcion ?? "",
    })),
  };
}

export function mapAboutPageToAboutPageData(
  data: PublicAboutPageResponse["data"]
): AboutPageData {
  return {
    banner: data.banner ? mapBannerToAboutBanner(data.banner) : null,

    history: data.nuestraHistoria
      ? mapHistoriaToAboutHistory(data.nuestraHistoria)
      : null,

    missionVision: data.misionYVision
      ? mapMisionVisionToAboutCards(data.misionYVision)
      : null,

    values: data.nuestrosValores
      ? mapValoresToAboutCards(data.nuestrosValores)
      : null,

    team: data.nuestroEquipo
      ? mapEquipoToAboutTeam(data.nuestroEquipo)
      : null,
  };
}
