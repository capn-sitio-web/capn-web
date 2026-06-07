import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";

// -------- Banner --------
export interface NewsBanner extends SectionBannerData {
  seccionId: number | null;
}

// -------- Categorías --------
export type NewsCategory = {
  id: number;
  name: string;
  slug: string;
};

// -------- Imagen --------
export type NewsImage = {
  file: File | null;
  previewUrl: string;
  imageId: number | null;
  alt: string;
};

// -------- Galería de imágenes --------
export type NewsGalleryImage = {
  id: string;
  imageId: number | null;
  file: File | null;
  previewUrl: string;
  alt: string;
  order: number;
};

// -------- Noticia --------
export type NewsPost = {
  id: string;
  noticiaId: number | null;
  categoryId: number | null;
  categoryName: string;
  title: string;
  content: string;
  coverImage: NewsImage;
  publicationDate: string;
  isPublished: boolean;
  isFeatured: boolean;
  galleryImages: NewsGalleryImage[];
};

export type NewsPostForm = NewsPost;

export type NewsStatusFilter = "all" | "published" | "unpublished";
