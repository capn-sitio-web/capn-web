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
    created_at?: string;
    updated_at?: string;

    listas: {
      idlista_seccion: number;
      texto_item: string;
    }[];

    elementos: {
      idelemento: number;
      seccion_idseccion: number;
      clave: string | null;
      titulo: string;
      descripcion: string;
      icono: string | null;
      imagen_url: string | null;
      created_at?: string;
      updated_at?: string;
    }[];

    imagenes: {
      idimagen_seccion: number;
      seccion_idseccion: number;
      imagen_url: string;
      imagen_alt: string;
      created_at?: string;
      updated_at?: string;
    }[];

    personal: {
      idpersonal: number;
      seccion_idseccion: number;
      nombre: string;
      cargo: string;
      descripcion: string;
      foto_url: string | null;
      created_at?: string;
      updated_at?: string;
    }[];

    contactos: unknown[];
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
