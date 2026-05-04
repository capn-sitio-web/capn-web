import type { SectionCardsData } from "../../../components/sectionCardsIcon/sectionCards.types";

// -------- Tipos base API --------
export type SectionImage = {
  idimagen_seccion: number;
  seccion_idseccion: number;
  imagen_url: string;
  imagen_alt: string | null;
};

export type SectionElement = {
  idelemento: number;
  seccion_idseccion: number;
  clave: string | null;
  titulo: string;
  descripcion: string | null;
  icono: string | null;
  imagen_url: string | null;
};

export type SectionResponse = {
  idseccion: number;
  slug: string;
  titulo: string;
  descripcion: string | null;
  elementos: SectionElement[];
  imagenes?: SectionImage[];
};

// -------- Historia --------
export type HistoryImage = {
  file: File | null;
  previewUrl: string;
  imageId: number | null;
  alt: string;
};

export type History = {
  seccionId: number | null;
  sectionTitle: string;
  description: string;
  image: HistoryImage;
};

// -------- Misión y Visión --------
export type MissionVision = {
  seccionId: number | null;
  missionElementId: number | null;
  visionElementId: number | null;
  mission: string;
  vision: string;
};

// -------- Valores --------
export interface Values extends SectionCardsData {
  seccionId: number | null;
}
