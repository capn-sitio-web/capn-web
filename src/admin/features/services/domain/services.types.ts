import type { SectionListImageData } from "../../../components/sectionListImage/sectionListImage.types";

export type ServiceAnalysisSection =
  | ServiceMicrobiological
  | ServicePhysicochemical
  | ServiceSensory
  | ServiceSpecialized;

// -------- Análisis Microbiológicos --------
export interface ServiceMicrobiological extends SectionListImageData {
  seccionId: number | null;
}

// -------- Análisis Fisicoquímicos --------
export interface ServicePhysicochemical extends SectionListImageData {
  seccionId: number | null;
}

// -------- Análisis Sensoriales --------
export interface ServiceSensory extends SectionListImageData {
  seccionId: number | null;
}

// -------- Análisis Especializados --------
export interface ServiceSpecialized extends SectionListImageData {
  seccionId: number | null;
}
