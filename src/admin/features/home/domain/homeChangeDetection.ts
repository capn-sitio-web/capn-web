import type { HomeServices } from "./home.types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/** ---- Servicios de Inicio ---- */
type NormalizedHomeServices = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    icon: string;
    title: string;
    description: string;
  }[];
};

export function normalizeHomeServices(data: HomeServices): NormalizedHomeServices {
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

export function hasHomeServicesChanges(current: HomeServices, saved: HomeServices): boolean {
  return isDifferent(normalizeHomeServices(current), normalizeHomeServices(saved));
}
