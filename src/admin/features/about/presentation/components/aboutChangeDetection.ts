import type { History } from "../../domain/about.types";
import type { MissionVision } from "../../domain/about.types";

export function fileFingerprint(file: File | null): string {
  if (!file) return "";
  return `${file.name}|${file.size}|${file.type}|${file.lastModified}`;
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** ---- Historia ---- */
type NormalizedHistory = {
  sectionTitle: string;
  paragraphs: Array<{ id: number; text: string }>;
  image: { previewUrl: string; fileFp: string };
};

export function normalizeHistory(d: History): NormalizedHistory {
  return {
    sectionTitle: (d.sectionTitle ?? "").trim(),
    paragraphs: (d.paragraphs ?? []).map((p) => ({
      id: p.id,
      text: (p.text ?? "").trim(),
    })),
    image: {
      previewUrl: (d.image?.previewUrl ?? "").trim(),
      fileFp: fileFingerprint(d.image?.file ?? null),
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
    mission: (d.mission ?? "").trim(),
    vision: (d.vision ?? "").trim(),
  };
}

export function hasMissionVisionChanges(current: MissionVision, saved: MissionVision): boolean {
  return isDifferent(normalizeMissionVision(current), normalizeMissionVision(saved));
}

/** ---- Valores ---- */
