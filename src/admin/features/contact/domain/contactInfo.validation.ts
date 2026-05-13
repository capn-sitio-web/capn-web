import { z } from "zod";

export const contactInfoValidation = z.object({
  seccionId: z.number().nullable().optional(),
  address: z
    .string()
    .trim()
    .min(1, "La dirección es obligatoria."),
  phone: z
    .string()
    .trim()
    .min(1, "El teléfono es obligatorio."),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un email válido."),
  facebookUrl: z
    .string()
    .trim()
    .optional()
    .default(""),
  mapEmbedUrl: z
    .string()
    .trim()
    .min(1, "El iframe o URL del mapa es obligatorio."),
});
