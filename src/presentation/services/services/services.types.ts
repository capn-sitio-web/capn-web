import type { ReactNode } from "react";

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

export type ServicesCta = {
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
  };
  secondaryButton: {
    label: string;
  };
};

export type ServicesPageData = {
  banner: ServicesBanner;

  microbiologico: ServiceInfoSection;
  fisicoquimico: ServiceInfoSection;
  sensorial: ServiceInfoSection;
  especializado: ServiceInfoSection;

  procesoTrabajo: ServicesSectionGroup<ServiceCardItem>;
  equiposTecnologia: ServicesSectionGroup<ServiceCardItem>;

  cta: ServicesCta;
};
