import type { SectionBannerData } from "./sectionBanner.types";

function normalizeText(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();
}

function normalizeFile(file: File | null | undefined): string {
  if (!file) return "";
  return [file.name, file.size, file.type, file.lastModified].join("-");
}

function isDifferent<N extends object>(a: N, b: N): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

export function normalizeSectionBanner(data: SectionBannerData) {
  return {
    sectionTitle: normalizeText(data.sectionTitle),
    description: normalizeText(data.description),
    image: {
      previewUrl: normalizeText(data.image?.previewUrl),
      file: normalizeFile(data.image?.file),
    },
  };
}

export function hasSectionBannerChanges<T extends SectionBannerData>(current: T, saved: T): boolean {
  return isDifferent(normalizeSectionBanner(current), normalizeSectionBanner(saved));
}
