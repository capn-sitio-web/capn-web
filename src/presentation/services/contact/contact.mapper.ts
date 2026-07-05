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
  return srcMatch?.[1] ?? trimmed;
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
    businessHours: contact?.horario_atencion ?? "",
    phones:
      contact?.telefonos
        ?.map((phone) => ({
          id: phone.idtelefono_contacto,
          value: phone.telefono,
          isPrimary: phone.es_principal,
          order: phone.orden,
        }))
        .sort((a, b) => a.order - b.order) ?? [],
    emails:
      contact?.correos
        ?.map((email) => ({
          id: email.idcorreo_contacto,
          value: email.correo,
          isPrimary: email.es_principal,
          order: email.orden,
        }))
        .sort((a, b) => a.order - b.order) ?? [],
    socialLinks:
      contact?.redes_sociales
        ?.map((social) => ({
          id: social.idred_social_contacto,
          type: social.tipo,
          url: social.url,
          order: social.orden,
        }))
        .sort((a, b) => a.order - b.order) ?? [],
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
