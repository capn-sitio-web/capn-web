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

export type AccreditationPageData = {
  banner: AccreditationBanner | null;
  sistemaCalidad: AccreditationSectionGroup<AccreditationQualityItem> | null;
};
