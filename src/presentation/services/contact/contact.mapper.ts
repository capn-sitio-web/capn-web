import type { PublicBannerData, PublicSectionData } from "../public.types";

import type {
  ContactBanner,
  ContactLocation,
  ContactPageData,
  PublicContactPageResponse,
} from "./contact.types";

export function mapBannerToContactBanner(
  data: PublicBannerData
): ContactBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

function extractMapSrc(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch?.[1]) {
    return srcMatch[1];
  }
  return trimmed;
}

export function mapInformacionToContactLocation(
  data: PublicSectionData
): ContactLocation {
  const contact = data.contactos?.[0];
  return {
    title: data.titulo,
    subtitle: data.descripcion ?? "",
    mapSrc: extractMapSrc(contact?.ubicacion_url ?? ""),
    locationName: contact?.ubicacion_nombre ?? "",
    phone: contact?.telefono ?? "",
    email: contact?.correo ?? "",
    facebookUrl: contact?.facebook_url ?? "",
  };
}

export function mapContactPageToContactPageData(
  data: PublicContactPageResponse["data"]
): ContactPageData {
  return {
    banner: data.banner ? mapBannerToContactBanner(data.banner) : null,
    location: data.informacion
      ? mapInformacionToContactLocation(data.informacion)
      : null,
  };
}
