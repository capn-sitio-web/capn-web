import type { ContactBanner, ContactInfo } from "./contact.types";
import { hasSectionBannerChanges } from "../../../components/sectionBanner/sectionBannerChangeDetection";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** ---- Banner ---- */
export function hasContactBannerChanges(
  current: ContactBanner,
  saved: ContactBanner
): boolean {
  return hasSectionBannerChanges(current, saved);
}

/** ---- Datos de contacto ---- */
type NormalizedContactInfo = {
  address: string;
  businessHours: string;
  mapEmbedUrl: string;
  phones: {
    value: string;
    isPrimary: boolean;
  }[];
  emails: {
    value: string;
    isPrimary: boolean;
  }[];
  socialLinks: {
    type: string;
    url: string;
  }[];
};

export function normalizeContactInfo(data: ContactInfo): NormalizedContactInfo {
  return {
    address: normalizeText(data.address),
    businessHours: normalizeText(data.businessHours),
    mapEmbedUrl: normalizeText(data.mapEmbedUrl),
    phones: data.phones.map((phone) => ({
      value: normalizeText(phone.value),
      isPrimary: Boolean(phone.isPrimary),
    })),
    emails: data.emails.map((email) => ({
      value: normalizeText(email.value),
      isPrimary: Boolean(email.isPrimary),
    })),
    socialLinks: data.socialLinks.map((social) => ({
      type: normalizeText(social.type),
      url: normalizeText(social.url),
    })),
  };
}

export function hasContactInfoChanges(current: ContactInfo, saved: ContactInfo): boolean {
  return isDifferent(normalizeContactInfo(current), normalizeContactInfo(saved));
}
