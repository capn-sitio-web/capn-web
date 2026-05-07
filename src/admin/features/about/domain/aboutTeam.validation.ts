import { z } from "zod";

export const aboutTeamValidation = z.object({
  seccionId: z.number().nullable().optional(),
  sectionTitle: z
    .string()
    .trim()
    .min(1, "El título de la sección es obligatorio."),
  sectionDescription: z.string().trim().optional(),
  members: z
    .array(
      z.object({
        id: z.string(),
        image: z
          .object({
            file: z.instanceof(File).nullable().default(null),
            previewUrl: z.string().default(""),
            imageId: z.number().nullable().default(null),
            alt: z.string().default(""),
          })
          .refine(
            (img) => Boolean(img.file) || Boolean(img.previewUrl?.trim()), {
              message: "La imagen del integrante es obligatoria.",
              path: ["image"],
            }),
        name: z
          .string()
          .trim()
          .min(1, "El nombre del integrante es obligatorio."),
        position: z
          .string()
          .trim()
          .min(1, "El cargo del integrante es obligatorio."),
        description: z
          .string()
          .trim()
          .min(1, "La descripción del integrante es obligatoria."),
      })
    )
    .min(1, "Debe existir al menos un integrante."),
});
