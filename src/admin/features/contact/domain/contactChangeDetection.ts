import type { ContactInfo } from "./contact.types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** ---- Datos de contacto ---- */
type NormalizedContactInfo = {
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  mapEmbedUrl: string;
};

export function normalizeContactInfo(data: ContactInfo): NormalizedContactInfo {
  return {
    address: normalizeText(data.address),
    phone: normalizeText(data.phone),
    email: normalizeText(data.email),
    facebookUrl: normalizeText(data.facebookUrl),
    mapEmbedUrl: normalizeText(data.mapEmbedUrl),
  };
}

export function hasContactInfoChanges(current: ContactInfo, saved: ContactInfo): boolean {
  return isDifferent(normalizeContactInfo(current), normalizeContactInfo(saved));
}
