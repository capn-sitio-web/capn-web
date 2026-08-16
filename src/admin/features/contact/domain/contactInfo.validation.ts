import { z } from "zod";

const phoneSchema = z.object({
  id: z.number().nullable().optional(),
  value: z
    .string()
    .trim()
    .min(1, "El teléfono es obligatorio.")
    .max(30, "El teléfono no debe exceder 30 caracteres."),
  isPrimary: z.boolean(),
  order: z.number(),
});

const emailSchema = z.object({
  id: z.number().nullable().optional(),
  value: z
    .string()
    .trim()
    .min(1, "El email es obligatorio.")
    .email("Ingresa un email válido.")
    .max(100, "El email no debe exceder 100 caracteres."),
  isPrimary: z.boolean(),
  order: z.number(),
});

const socialLinkSchema = z.object({
  id: z.number().nullable().optional(),
  type: z.enum(["facebook", "instagram", "youtube", "tiktok", "linkedin"]),
  url: z
    .string()
    .trim()
    .min(1, "La URL de la red social es obligatoria.")
    .url("Ingresa una URL válida.")
    .max(200, "La URL no debe exceder 200 caracteres."),
  order: z.number(),
});

export const contactInfoValidation = z
  .object({
    seccionId: z.number().nullable().optional(),
    address: z
      .string()
      .trim()
      .min(1, "La dirección es obligatoria.")
      .max(200, "La dirección no debe exceder 200 caracteres."),
    businessHours: z
      .string()
      .trim()
      .max(255, "El horario no debe exceder 255 caracteres.")
      .optional()
      .default(""),
    latitud: z
      .number({ message: "La latitud es obligatoria y debe ser un número." })
      .min(-90, "La latitud debe estar entre -90 y 90.")
      .max(90, "La latitud debe estar entre -90 y 90."),
    longitud: z
      .number({ message: "La longitud es obligatoria y debe ser un número." })
      .min(-180, "La longitud debe estar entre -180 y 180.")
      .max(180, "La longitud debe estar entre -180 y 180."),
    phones: z.array(phoneSchema).min(1, "Debe existir al menos un teléfono."),
    emails: z.array(emailSchema).min(1, "Debe existir al menos un email."),
    socialLinks: z.array(socialLinkSchema).optional().default([]),
  })
  .refine((data) => data.phones.some((phone) => phone.isPrimary), {
    message: "Selecciona un teléfono principal.",
    path: ["phones"],
  })
  .refine((data) => data.emails.some((email) => email.isPrimary), {
    message: "Selecciona un email principal.",
    path: ["emails"],
  });
  