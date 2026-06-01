import type { ReactNode } from "react";
import type { PublicBannerData, PublicSectionData } from "../public.types";

export type PublicAboutPageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    nuestraHistoria: PublicSectionData | null;
    misionYVision: PublicSectionData | null;
    nuestrosValores: PublicSectionData | null;
    nuestroEquipo: PublicSectionData | null;
  };
};

export type AboutBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type AboutHistory = {
  title: string;
  description: string;
  image: string;
};

export type AboutCardItem = {
  icon: ReactNode;
  title: string;
  description: string;
  txtAlign?: "left" | "center" | "right";
};

export type AboutTeamItem = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export type AboutSectionGroup<T> = {
  title: string;
  subtitle?: string;
  items: T[];
};

export type AboutPageData = {
  banner: AboutBanner | null;
  history: AboutHistory | null;
  missionVision: AboutSectionGroup<AboutCardItem> | null;
  values: AboutSectionGroup<AboutCardItem> | null;
  team: AboutSectionGroup<AboutTeamItem> | null;
};
