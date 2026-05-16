import type { ServicesBanner } from "./services.types";
import { hasSectionBannerChanges } from "../../../components/sectionBanner/sectionBannerChangeDetection";

import type {
  ServiceAnalysisSection,
  ServiceMicrobiological,
  ServicePhysicochemical,
  ServiceSensory,
  ServiceSpecialized,
  ServiceWorkProcess,
  ServiceEquipmentTechnology,
} from "./services.types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function normalizeFile(file: File | null | undefined): string {
  if (!file) return "";
  return [
    file.name,
    file.size,
    file.type,
    file.lastModified,
  ].join("-");
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}


/** ---- Banner ---- */
export function hasServicesBannerChanges(current: ServicesBanner, saved: ServicesBanner): boolean {
  return hasSectionBannerChanges(current, saved);
}

/** ---- Análisis reutilizable ---- */
type NormalizedSectionListImage = {
  sectionTitle: string;
  sectionDescription: string;
  items: { text: string; }[];
  image: { previewUrl: string; file: string; };
};

function normalizeSectionListImage(
  data: ServiceAnalysisSection
): NormalizedSectionListImage {
  return {
    sectionTitle: normalizeText(data.sectionTitle),
    sectionDescription: normalizeText(data.sectionDescription),
    items: data.items.map((item) => ({
      text: normalizeText(item.text),
    })),
    image: {
      previewUrl: normalizeText(data.image?.previewUrl),
      file: normalizeFile(data.image?.file),
    },
  };
}

/** ---- Análisis Microbiológicos ---- */
export function hasServiceMicrobiologicalChanges(current: ServiceMicrobiological, saved: ServiceMicrobiological): boolean {
  return isDifferent(normalizeSectionListImage(current), normalizeSectionListImage(saved));
}

/** ---- Análisis Fisicoquímicos ---- */
export function hasServicePhysicochemicalChanges(current: ServicePhysicochemical, saved: ServicePhysicochemical): boolean {
  return isDifferent(normalizeSectionListImage(current), normalizeSectionListImage(saved));
}

/** ---- Análisis Sensoriales ---- */
export function hasServiceSensoryChanges(current: ServiceSensory, saved: ServiceSensory): boolean {
  return isDifferent(normalizeSectionListImage(current), normalizeSectionListImage(saved));
}

/** ---- Análisis Especializados ---- */
export function hasServiceSpecializedChanges(current: ServiceSpecialized, saved: ServiceSpecialized): boolean {
  return isDifferent(normalizeSectionListImage(current), normalizeSectionListImage(saved));
}

/** ---- Proceso de Trabajo ---- */
type NormalizedServiceWorkProcess = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export function normalizeServiceWorkProcess(
  data: ServiceWorkProcess
): NormalizedServiceWorkProcess {
  return {
    sectionTitle: normalizeText(data.sectionTitle),
    sectionDescription: normalizeText(data.sectionDescription),
    cards: data.cards.map((card) => ({
      icon: normalizeText(card.icon),
      title: normalizeText(card.title),
      description: normalizeText(card.description),
    })),
  };
}

export function hasServiceWorkProcessChanges(current: ServiceWorkProcess, saved: ServiceWorkProcess): boolean {
  return isDifferent(normalizeServiceWorkProcess(current), normalizeServiceWorkProcess(saved));
}

/** ---- Equipos y Tecnología ---- */
type NormalizedServiceEquipmentTechnology = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export function normalizeServiceEquipmentTechnology(
  data: ServiceEquipmentTechnology
): NormalizedServiceEquipmentTechnology {
  return {
    sectionTitle: normalizeText(data.sectionTitle),
    sectionDescription: normalizeText(data.sectionDescription),
    cards: data.cards.map((card) => ({
      icon: normalizeText(card.icon),
      title: normalizeText(card.title),
      description: normalizeText(card.description),
    })),
  };
}

export function hasServiceEquipmentTechnologyChanges(current: ServiceEquipmentTechnology, saved: ServiceEquipmentTechnology): boolean {
  return isDifferent(normalizeServiceEquipmentTechnology(current), normalizeServiceEquipmentTechnology(saved));
}
