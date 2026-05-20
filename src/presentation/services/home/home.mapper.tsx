import {
  Science,
  Restaurant,
  ColorLens,
  LocalHospital,
  Shield,
  EmojiEvents,
  Favorite,
  Visibility,
  Description,
  Settings,
} from "@mui/icons-material";

import type {
  HomeBanner,
  HomeServices,
  HomeQuality,
  PublicSectionResponse,
} from "./home.types";

function mapIconNameToMui(iconName: string | null) {
  switch (iconName) {
    case "flask":
      return <Science />;
    case "utensils":
      return <Restaurant />;
    case "palette":
      return <ColorLens />;
    case "medical":
      return <LocalHospital />;
    case "shield":
      return <Shield />;
    case "trophy":
      return <EmojiEvents />;
    case "heart":
      return <Favorite />;
    case "eye":
      return <Visibility />;
    case "document":
      return <Description />;
    case "settings":
      return <Settings />;
    default:
      return <Science />;
  }
}

export function mapBannerToHomeBanner(data: {
  sectionTitle: string;
  description: string;
  image: {
    previewUrl: string;
    alt: string;
  } | null;
}): HomeBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl ?? "",
  };
}

export function mapServiciosToHomeServices(
  data: PublicSectionResponse["data"]
): HomeServices {
  return {
    title: data.titulo,
    subtitle: data.descripcion,
    items: data.elementos.map((item) => ({
      icon: mapIconNameToMui(item.icono),
      title: item.titulo,
      description: item.descripcion,
    })),
  };
}

export function mapCalidadToHomeQuality(
  data: PublicSectionResponse["data"]
): HomeQuality {
  return {
    title: data.titulo,
    description: data.descripcion,
    image: data.imagenes?.[0]?.imagen_url
      ? `${import.meta.env.VITE_API_BASE_URL?.replace("/api", "")}/${data.imagenes[0].imagen_url}`
      : "",
    items: data.listas.map((item) => item.texto_item),
  };
}
