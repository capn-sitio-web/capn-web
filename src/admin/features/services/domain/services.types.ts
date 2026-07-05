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

// -------- Detalle extendido de análisis --------
export type ServiceDetailImage = {
  id: string;
  imageId: number | null;
  file: File | null;
  previewUrl: string;
  alt: string;
  order: number;
};

export type ServiceAnalysisDetail = {
  extendedContent: string;
  galleryImages: ServiceDetailImage[];
  galleryImagesToDelete?: number[];
};

// -------- Análisis Microbiológicos --------
export interface ServiceMicrobiological extends SectionListImageData, ServiceAnalysisDetail {
  seccionId: number | null;
}

// -------- Análisis Fisicoquímicos --------
export interface ServicePhysicochemical extends SectionListImageData, ServiceAnalysisDetail {
  seccionId: number | null;
}

// -------- Análisis Sensoriales --------
export interface ServiceSensory extends SectionListImageData, ServiceAnalysisDetail {
  seccionId: number | null;
}

// -------- Análisis Especializados --------
export interface ServiceSpecialized extends SectionListImageData, ServiceAnalysisDetail {
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
