import {
  Security,
  EmojiEvents,
  Favorite,
  Visibility,
  Shield,
  Science,
  Restaurant,
  ColorLens,
  LocalHospital,
  Description,
  Settings,
} from "@mui/icons-material";

import type {
  AboutBanner,
  AboutHistory,
  AboutCardItem,
  AboutTeamItem,
  AboutSectionGroup,
  PublicSectionResponse,
} from "./about.types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace("/api", "");

function getFullImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return "";

  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${apiBaseUrl}/${imageUrl}`;
}

function mapIconNameToMui(iconName: string | null) {
  switch (iconName) {
    case "security":
      return <Security sx={{ color: "#3B82F6" }} />;
    case "shield":
      return <Shield sx={{ color: "#3B82F6" }} />;
    case "eye":
      return <Visibility sx={{ color: "#22C55E" }} />;
    case "trophy":
      return <EmojiEvents sx={{ color: "#22C55E" }} />;
    case "heart":
      return <Favorite sx={{ color: "#F97316" }} />;
    case "flask":
      return <Science sx={{ color: "#3B82F6" }} />;
    case "utensils":
      return <Restaurant sx={{ color: "#22C55E" }} />;
    case "palette":
      return <ColorLens sx={{ color: "#F97316" }} />;
    case "medical":
      return <LocalHospital sx={{ color: "#A855F7" }} />;
    case "document":
      return <Description sx={{ color: "#3B82F6" }} />;
    case "settings":
      return <Settings sx={{ color: "#3B82F6" }} />;
    default:
      return <Security sx={{ color: "#3B82F6" }} />;
  }
}

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
    image: data.image?.previewUrl ?? "",
  };
}

export function mapHistoriaToAboutHistory(
  data: PublicSectionResponse["data"]
): AboutHistory {
  return {
    title: data.titulo,
    description: data.descripcion ?? "",
    image: getFullImageUrl(data.imagenes?.[0]?.imagen_url),
  };
}

export function mapMisionVisionToAboutCards(
  data: PublicSectionResponse["data"]
): AboutSectionGroup<AboutCardItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion,
      txtAlign: "left",
    })),
  };
}

export function mapValoresToAboutCards(
  data: PublicSectionResponse["data"]
): AboutSectionGroup<AboutCardItem> {
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

export function mapEquipoToAboutTeam(
  data: PublicSectionResponse["data"]
): AboutSectionGroup<AboutTeamItem> {
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? undefined,
    items: data.personal.map((person) => ({
      image: getFullImageUrl(person.foto_url),
      title: person.nombre,
      subtitle: person.cargo,
      description: person.descripcion,
    })),
  };
}
