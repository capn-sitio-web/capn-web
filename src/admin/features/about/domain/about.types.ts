// -------- Tipos base API --------
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
};

// -------- Historia --------
export type HistoryParagraph = {
  id: number;
  text: string;
};

export type HistoryImage = {
  file: File | null;
  previewUrl: string;
};

export type History = {
  sectionTitle: string;
  paragraphs: HistoryParagraph[];
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
