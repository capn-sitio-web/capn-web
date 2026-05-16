import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";
import type { SectionListImageData } from "../../../components/sectionListImage/sectionListImage.types";
import type { SectionCardsData } from "../../../components/sectionCardsIcon/sectionCards.types";

export type ServiceAnalysisSection =
  | ServiceMicrobiological
  | ServicePhysicochemical
  | ServiceSensory
  | ServiceSpecialized;

// -------- Banner --------
export interface ServicesBanner extends SectionBannerData {
  seccionId: number | null;
}

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

// -------- Proceso de Trabajo --------
export interface ServiceWorkProcess extends SectionCardsData {
  seccionId: number | null;
}

// -------- Equipos y Tecnología --------
export interface ServiceEquipmentTechnology extends SectionCardsData {
  seccionId: number | null;
}
