import { z } from "zod";
import type { SectionBannerData } from "./sectionBanner.types";

export const sectionBannerValidation = z.object({
  sectionTitle: z
    .string()
    .trim()
    .min(1, "El título de la sección es obligatorio.")
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(150, "El título no debe exceder los 150 caracteres."),

  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria.")
    .min(10, "La descripción debe tener al menos 10 caracteres."),

  image: z
    .object({
      file: z.instanceof(File).nullable().default(null),
      previewUrl: z.string().default(""),
      imageId: z.number().nullable().default(null),
      alt: z.string().default(""),
    })
    .refine((img) => Boolean(img.file) || Boolean(img.previewUrl?.trim()), {
      message: "La imagen es obligatoria.",
      path: ["image"],
    }),
});

export type SectionBannerErrors = {
  sectionTitle?: string;
  description?: string;
  image?: string;
};

type ValidateSectionBannerResult =
  | {
      success: true;
      errors: SectionBannerErrors;
      data: SectionBannerData;
    }
  | {
      success: false;
      errors: SectionBannerErrors;
      data: null;
    };

export function validateSectionBanner(
  data: unknown
): ValidateSectionBannerResult {
  const result = sectionBannerValidation.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      errors: {},
      data: {
        sectionTitle: result.data.sectionTitle,
        description: result.data.description,
        image: {
          file: result.data.image.file ?? null,
          previewUrl: result.data.image.previewUrl ?? "",
          imageId: result.data.image.imageId ?? null,
          alt: result.data.image.alt ?? "",
        },
      },
    };
  }

  const errors: SectionBannerErrors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];

    if (field === "sectionTitle") errors.sectionTitle = issue.message;
    if (field === "description") errors.description = issue.message;
    if (field === "image") errors.image = issue.message;
  });

  return {
    success: false as const,
    errors,
    data: null,
  };
}
