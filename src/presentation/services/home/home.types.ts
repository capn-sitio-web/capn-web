import type { ReactNode } from "react";
import type {
  PublicBannerData,
  PublicSectionData,
} from "../public.types";

export type PublicHomePageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    nuestrosServicios: PublicSectionData | null;
    calidadCertificada: PublicSectionData | null;
  };
};

export type HomeServiceCardItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type HomeBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type HomeServices = {
  title: string;
  subtitle: string;
  items: HomeServiceCardItem[];
};

export type HomeQuality = {
  title: string;
  description: string;
  image: string;
  items: string[];
};

export type HomePageData = {
  banner: HomeBanner | null;
  services: HomeServices | null;
  quality: HomeQuality | null;
};
