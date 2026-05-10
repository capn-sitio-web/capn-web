import type { ServiceMicrobiological } from "./services.types";

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

/** ---- Análisis Microbiológicos ---- */
type NormalizedServiceMicrobiological = {
  sectionTitle: string;
  sectionDescription: string;
  items: { text: string; }[];
  image: { previewUrl: string; file: string; };
};

export function normalizeServiceMicrobiological(data: ServiceMicrobiological): NormalizedServiceMicrobiological {
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

export function hasServiceMicrobiologicalChanges(current: ServiceMicrobiological, saved: ServiceMicrobiological): boolean {
  return isDifferent(normalizeServiceMicrobiological(current), normalizeServiceMicrobiological(saved));
}
