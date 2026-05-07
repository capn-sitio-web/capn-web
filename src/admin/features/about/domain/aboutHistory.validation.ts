import { z } from "zod";

export const aboutHistoryValidation = z.object({
  sectionTitle: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .min(1, "El título de la sección es obligatorio."),
  description: z
    .string()
    .trim()
    .min(1, "La descripción es obligatoria.")
    .min(20, "La descripción debe tener al menos 20 caracteres."),
  // imagen: en mocks será File|null, y previewUrl string.
  image: z
    .object({
      file: z.instanceof(File).nullable().optional(),
      previewUrl: z.string().optional().default(""),
      imageId: z.number().nullable().optional(),
      alt: z.string().optional().default(""),
    })
    .refine((img) => Boolean(img.file) || Boolean(img.previewUrl?.trim()), {
      message: "La imagen es obligatoria.",
      path: ["image"],
    }),
});
