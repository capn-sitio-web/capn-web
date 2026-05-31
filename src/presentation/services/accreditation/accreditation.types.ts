import type { ReactNode } from "react";
import type { PublicBannerData, PublicSectionData } from "../public.types";

export type PublicAccreditationPageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    sistemaCalidad: PublicSectionData | null;
  };
};

export type AccreditationBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type AccreditationQualityItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type AccreditationSectionGroup<T> = {
  title: string;
  subtitle?: string;
  items: T[];
};

export type AccreditationPageData = {
  banner: AccreditationBanner | null;
  sistemaCalidad: AccreditationSectionGroup<AccreditationQualityItem> | null;
};
