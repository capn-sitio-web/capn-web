import type { AccreditationBanner } from "./accreditation.types";
import type { AccreditationQualitySystem } from "./accreditation.types";
import { hasSectionBannerChanges } from "../../../components/sectionBanner/sectionBannerChangeDetection";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}


/** ---- Banner ---- */
export function hasAccreditationBannerChanges(current: AccreditationBanner, saved: AccreditationBanner): boolean {
  return hasSectionBannerChanges(current, saved);
}

/** ---- Sistema de Calidad ---- */
type NormalizedAccreditationQualitySystem = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export function normalizeAccreditationQualitySystem(
  data: AccreditationQualitySystem
): NormalizedAccreditationQualitySystem {
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

export function hasAccreditationQualitySystemChanges(current: AccreditationQualitySystem, saved: AccreditationQualitySystem): boolean {
  return isDifferent(normalizeAccreditationQualitySystem(current), normalizeAccreditationQualitySystem(saved));
}
