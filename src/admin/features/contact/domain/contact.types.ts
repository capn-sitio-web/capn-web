import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";

// -------- Banner --------
export interface ContactBanner extends SectionBannerData {
  seccionId: number | null;
}

export interface ContactInfo {
  seccionId: number | null;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  mapEmbedUrl: string;
}
