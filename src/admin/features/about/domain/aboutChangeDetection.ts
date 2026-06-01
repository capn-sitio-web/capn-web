import type { AboutBanner } from "./about.types";
import type { History, MissionVision, Values, Team } from "./about.types";
import { hasSectionBannerChanges } from "../../../components/sectionBanner/sectionBannerChangeDetection";

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
export function hasAboutBannerChanges(current: AboutBanner, saved: AboutBanner): boolean {
  return hasSectionBannerChanges(current, saved);
}

/** ---- Historia ---- */
type NormalizedHistory = {
  sectionTitle: string;
  description: string;
  image: { previewUrl: string; file: string; };
};

export function normalizeHistory(d: History): NormalizedHistory {
  return {
    sectionTitle: normalizeText(d.sectionTitle),
    description: normalizeText(d.description),
    image: {
      previewUrl: normalizeText(d.image?.previewUrl),
      file: normalizeFile(d.image?.file),
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
type NormalizedTeam = {
  sectionTitle: string;
  sectionDescription: string;
  members: {
    image: { previewUrl: string; file: string; };
    name: string;
    position: string;
    description: string;
  }[];
};

export function normalizeTeam(d: Team): NormalizedTeam {
  return {
    sectionTitle: normalizeText(d.sectionTitle),
    sectionDescription: normalizeText(d.sectionDescription),
    members: d.members.map((member) => ({
      image: {
        previewUrl: normalizeText(member.image?.previewUrl),
        file: normalizeFile(member.image?.file),
      },
      name: normalizeText(member.name),
      position: normalizeText(member.position),
      description: normalizeText(member.description),
    })),
  };
}

export function hasTeamChanges(current: Team, saved: Team): boolean {
  return isDifferent(normalizeTeam(current), normalizeTeam(saved));
}
