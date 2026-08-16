import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";

// -------- Banner --------
export interface ContactBanner extends SectionBannerData {
  seccionId: number | null;
}

// -------- Informacion de Contacto --------
export type ContactPhone = {
  id: number | null;
  value: string;
  isPrimary: boolean;
  order: number;
};

export type ContactEmail = {
  id: number | null;
  value: string;
  isPrimary: boolean;
  order: number;
};

export type ContactSocialType =
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "linkedin";

export type ContactSocialLink = {
  id: number | null;
  type: ContactSocialType;
  url: string;
  order: number;
};

export interface ContactInfo {
  seccionId: number | null;
  address: string;
  businessHours: string;
  latitud: number;
  longitud: number;
  phones: ContactPhone[];
  emails: ContactEmail[];
  socialLinks: ContactSocialLink[];
}
