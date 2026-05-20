import type { ReactNode } from "react";

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

export type AccreditationCta = {
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
  };
  secondaryButton: {
    label: string;
  };
};

export type AccreditationPageData = {
  banner: AccreditationBanner;
  sistemaCalidad: AccreditationSectionGroup<AccreditationQualityItem>;
  cta: AccreditationCta;
};
