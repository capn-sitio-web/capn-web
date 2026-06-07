import { z } from "zod";
import type { NewsPostForm } from "./news.types";

export const newsPostValidation = z.object({
  noticiaId: z.number().nullable().optional(),

  categoryId: z
    .number({
      message: "La categoría es obligatoria.",
    })
    .nullable()
    .refine((value) => value !== null, {
      message: "La categoría es obligatoria.",
    }),

  title: z
    .string()
    .trim()
    .min(1, "El título de la noticia es obligatorio.")
    .max(180, "El título no debe exceder los 180 caracteres."),

  content: z
    .string()
    .trim()
    .min(1, "El contenido de la noticia es obligatorio.")
    .min(20, "El contenido debe tener al menos 20 caracteres."),

  coverImage: z
    .object({
      file: z.instanceof(File).nullable().default(null),
      previewUrl: z.string().default(""),
      imageId: z.number().nullable().default(null),
      alt: z.string().default(""),
    })
    .refine((image) => Boolean(image.file) || Boolean(image.previewUrl?.trim()), {
      message: "La imagen de portada es obligatoria.",
      path: ["coverImage"],
    }),

  publicationDate: z
    .string()
    .trim()
    .min(1, "La fecha de publicación es obligatoria."),

  isPublished: z.boolean(),

  isFeatured: z.boolean(),

  galleryImages: z.array(
    z.object({
      id: z.string(),
      imageId: z.number().nullable(),
      file: z.instanceof(File).nullable(),
      previewUrl: z.string(),
      alt: z.string(),
      order: z.number(),
    })
  ),
});

export type NewsPostFormErrors = {
  categoryId?: string;
  title?: string;
  content?: string;
  coverImage?: string;
  publicationDate?: string;
  isPublished?: string;
  isFeatured?: string;
};

export function validateNewsPostForm(data: NewsPostForm) {
  const result = newsPostValidation.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      errors: {},
      data: result.data,
    };
  }

  const errors: NewsPostFormErrors = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];

    if (field === "categoryId") errors.categoryId = issue.message;
    if (field === "title") errors.title = issue.message;
    if (field === "content") errors.content = issue.message;
    if (field === "coverImage") errors.coverImage = issue.message;
    if (field === "publicationDate") errors.publicationDate = issue.message;
    if (field === "isPublished") errors.isPublished = issue.message;
    if (field === "isFeatured") errors.isFeatured = issue.message;
  });

  return {
    success: false as const,
    errors,
    data: null,
  };
}
