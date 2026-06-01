import type { HomeBanner } from "./home.types";
import type { HomeServices, HomeQuality } from "./home.types";
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
export function hasHomeBannerChanges(current: HomeBanner, saved: HomeBanner): boolean {
  return hasSectionBannerChanges(current, saved);
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

/** ---- Calidad Certificada de Inicio ---- */
type NormalizedHomeQuality = {
  sectionTitle: string;
  sectionDescription: string;
  items: { text: string; }[];
  image: { previewUrl: string; file: string; };
};

export function normalizeHomeQuality(data: HomeQuality): NormalizedHomeQuality {
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

export function hasHomeQualityChanges(current: HomeQuality, saved: HomeQuality): boolean {
  return isDifferent(normalizeHomeQuality(current), normalizeHomeQuality(saved));
}
