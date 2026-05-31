import type { ReactNode } from "react";
import type { PublicBannerData, PublicSectionData } from "../public.types";

export type PublicServicesPageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;

    analisisMicrobiologico: PublicSectionData | null;
    analisisFisicoquimico: PublicSectionData | null;
    analisisSensorial: PublicSectionData | null;
    analisisEspecializado: PublicSectionData | null;

    procesoTrabajo: PublicSectionData | null;
    equiposTecnologia: PublicSectionData | null;
  };
};

export type ServicesBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type ServiceInfoSection = {
  title: string;
  description: string;
  image: string;
  items: string[];
};

export type ServiceCardItem = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type ServicesSectionGroup<T> = {
  title: string;
  subtitle?: string;
  items: T[];
};

export type ServicesPageData = {
  banner: ServicesBanner | null;

  microbiologico: ServiceInfoSection | null;
  fisicoquimico: ServiceInfoSection | null;
  sensorial: ServiceInfoSection | null;
  especializado: ServiceInfoSection | null;

  procesoTrabajo: ServicesSectionGroup<ServiceCardItem> | null;
  equiposTecnologia: ServicesSectionGroup<ServiceCardItem> | null;
};
