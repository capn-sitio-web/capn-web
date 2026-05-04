import type { History, MissionVision, Values } from "./about.types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** ---- Historia ---- */
type NormalizedHistory = {
  sectionTitle: string;
  description: string;
  image: { previewUrl: string; hasNewFile: boolean; };
};

export function normalizeHistory(d: History): NormalizedHistory {
  return {
    sectionTitle: normalizeText(d.sectionTitle),
    description: normalizeText(d.description),
    image: {
      previewUrl: normalizeText(d.image?.previewUrl),
      hasNewFile: Boolean(d.image?.file),
    },
  };
}

export function hasHistoryChanges(current: History, saved: History): boolean {
  return isDifferent(normalizeHistory(current), normalizeHistory(saved));
}

/** ---- Mision y Vision ---- */
type NormalizedMissionVision = { mission: string; vision: string };

export function normalizeMissionVision(d: MissionVision): NormalizedMissionVision {
  return {
    mission: normalizeText(d.mission),
    vision: normalizeText(d.vision),
  };
}

export function hasMissionVisionChanges(current: MissionVision, saved: MissionVision): boolean {
  return isDifferent(normalizeMissionVision(current), normalizeMissionVision(saved));
}

/** ---- Valores ---- */
type NormalizedValues = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export function normalizeValues(d: Values): NormalizedValues {
  return {
    sectionTitle: normalizeText(d.sectionTitle),
    sectionDescription: normalizeText(d.sectionDescription),
    cards: d.cards.map((card) => ({
      icon: normalizeText(card.icon),
      title: normalizeText(card.title),
      description: normalizeText(card.description),
    })),
  };
}

export function hasValuesChanges(current: Values, saved: Values): boolean {
  return isDifferent(normalizeValues(current), normalizeValues(saved));
}

/** ---- Equipo ---- */
