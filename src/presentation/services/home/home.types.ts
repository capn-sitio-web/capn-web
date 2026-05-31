import type { ReactNode } from "react";

export type PublicBannerData = {
  seccionId: number;
  sectionTitle: string;
  description: string;
  image: {
    previewUrl: string;
    imageId: number | null;
    alt: string;
  } | null;
};

export type PublicSectionData = {
  idseccion: number;
  slug: string;
  titulo: string;
  descripcion: string | null;
  created_at?: string;
  updated_at?: string;

  listas: {
    idlista_seccion: number;
    seccion_idseccion?: number;
    texto_item: string;
    created_at?: string;
    updated_at?: string;
  }[];

  elementos: {
    idelemento: number;
    seccion_idseccion?: number;
    clave?: string | null;
    titulo: string;
    descripcion: string;
    icono: string | null;
    imagen_url: string | null;
    created_at?: string;
    updated_at?: string;
  }[];

  imagenes: {
    idimagen_seccion: number;
    seccion_idseccion?: number;
    imagen_url: string;
    imagen_alt: string;
    created_at?: string;
    updated_at?: string;
  }[];

  personal?: unknown[];
  contactos?: unknown[];
};

export type PublicHomePageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    nuestrosServicios: PublicSectionData | null;
    calidadCertificada: PublicSectionData | null;
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
  banner: HomeBanner | null;
  services: HomeServices | null;
  quality: HomeQuality | null;
};
