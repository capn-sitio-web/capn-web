import type { PublicBannerData, PublicSectionData } from "../public.types";

export type PublicContactPageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    informacion: PublicSectionData | null;
  };
};

export type ContactBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type ContactPhone = {
  id: number;
  value: string;
  isPrimary: boolean;
  order: number;
};

export type ContactEmail = {
  id: number;
  value: string;
  isPrimary: boolean;
  order: number;
};

export type ContactSocialLink = {
  id: number;
  type: string;
  url: string;
  order: number;
};

export type ContactLocation = {
  title: string;
  subtitle: string;
  latitud: number;
  longitud: number;
  locationName: string;
  businessHours: string;
  phones: ContactPhone[];
  emails: ContactEmail[];
  socialLinks: ContactSocialLink[];
};

export type ContactPageData = {
  banner: ContactBanner | null;
  location: ContactLocation | null;
};
