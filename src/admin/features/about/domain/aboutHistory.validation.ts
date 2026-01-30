import { z } from "zod";

export const aboutHistoryValidation = z.object({
  sectionTitle: z
    .string()
    .trim()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .min(1, "El título de la sección es obligatorio."),
  paragraphs: z
    .array(
      z.object({
        id: z.number().int(),
        text: z.string().trim().min(1, "El párrafo no puede estar vacío."),
      }),
    )
    .min(1, "Debe existir al menos un párrafo."),
  // imagen: en mocks será File|null, y previewUrl string.
  image: z.object({
    file: z.instanceof(File).nullable(),
      previewUrl: z.string().optional().default(""),
    })
    .refine((img) => Boolean(img.file) || Boolean(img.previewUrl?.trim()), {
      message: "La imagen es obligatoria.",
      path: ["file"],
  }),
});
