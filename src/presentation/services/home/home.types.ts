import type { ReactNode } from "react";

export type PublicBannerResponse = {
  message: string;
  data: {
    seccionId: number;
    sectionTitle: string;
    description: string;
    image: {
      previewUrl: string;
      imageId: number | null;
      alt: string;
    } | null;
  };
};

export type PublicSectionResponse = {
  message: string;
  data: {
    idseccion: number;
    slug: string;
    titulo: string;
    descripcion: string | null;
    listas: {
      idlista_seccion: number;
      texto_item: string;
    }[];
    elementos: {
      idelemento: number;
      titulo: string;
      descripcion: string;
      icono: string | null;
      imagen_url: string | null;
    }[];
    imagenes: {
      idimagen_seccion: number;
      imagen_url: string;
      imagen_alt: string;
    }[];
  };
};

export type HomeBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type HomeServiceCardItem = {
  icon: ReactNode;
  title: string;
  description: string;
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
  banner: HomeBanner;
  services: HomeServices;
  quality: HomeQuality;
};
