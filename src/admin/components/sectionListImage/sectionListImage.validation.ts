import { z } from "zod";
import type { SectionListImageData } from "./sectionListImage.types";

export const sectionListImageSchema = z.object({
  sectionTitle: z
    .string()
    .trim()
    .min(1, "El título de la sección es obligatorio."),

  sectionDescription: z.string().trim().optional(),

  items: z
    .array(
      z.object({
        id: z.string(),
        text: z
          .string()
          .trim()
          .min(1, "El texto del punto es obligatorio."),
      })
    )
    .min(1, "Debe existir al menos un punto en la lista."),

  image: z
    .object({
      file: z.instanceof(File).nullable().default(null),
      previewUrl: z.string().default(""),
      imageId: z.number().nullable().default(null),
      alt: z.string().default(""),
    })
    .refine((img) => Boolean(img.file) || Boolean(img.previewUrl?.trim()), {
      message: "La imagen es obligatoria.",
    }),
});

export type SectionListImageFormErrors = {
  sectionTitle?: string;
  sectionDescription?: string;
  image?: string;
  items?: {
    text?: string;
  }[];
};

type ValidateSectionListImageResult =
  | {
      success: true;
      errors: SectionListImageFormErrors;
      data: SectionListImageData;
    }
  | {
      success: false;
      errors: SectionListImageFormErrors;
      data: null;
    };

export function validateSectionListImage(
  data: unknown
): ValidateSectionListImageResult {
  const result = sectionListImageSchema.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      errors: {},
      data: {
        sectionTitle: result.data.sectionTitle,
        sectionDescription: result.data.sectionDescription ?? "",
        items: result.data.items,
        image: {
          file: result.data.image.file ?? null,
          previewUrl: result.data.image.previewUrl ?? "",
          imageId: result.data.image.imageId ?? null,
          alt: result.data.image.alt ?? "",
        },
      },
    };
  }

  const errors: SectionListImageFormErrors = {};

  result.error.issues.forEach((issue) => {
    const path = issue.path;

    if (path[0] === "sectionTitle") {
      errors.sectionTitle = issue.message;
    }

    if (path[0] === "sectionDescription") {
      errors.sectionDescription = issue.message;
    }

    if (path[0] === "image") {
      errors.image = issue.message;
    }

    if (path[0] === "items" && typeof path[1] === "number") {
      const index = path[1];

      if (!errors.items) errors.items = [];
      if (!errors.items[index]) errors.items[index] = {};

      errors.items[index].text = issue.message;
    }
  });

  return {
    success: false as const,
    errors,
    data: null,
  };
}
