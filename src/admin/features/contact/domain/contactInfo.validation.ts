import { z } from "zod";

export const contactInfoValidation = z.object({
  seccionId: z.number().nullable().optional(),
  address: z
    .string()
    .trim()
    .min(1, "La dirección es obligatoria.")
    .max(255, "La dirección no debe exceder 200 caracteres."),
  phone: z
    .string()
    .trim()
    .min(1, "El teléfono es obligatorio.")
    .max(30, "El teléfono no debe exceder 30 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un email válido.")
    .max(100, "El email no debe exceder 100 caracteres."),
  facebookUrl: z
    .string()
    .trim()
    .max(150, "La URL de Facebook no debe exceder 150 caracteres.")
    .optional()
    .default(""),
  mapEmbedUrl: z
    .string()
    .trim()
    .min(1, "El iframe o URL del mapa es obligatorio."),
});
