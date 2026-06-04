import type { NewsCategory, NewsPost, NewsPostForm } from "../domain/news.types";

const mockCategories: NewsCategory[] = [
  {
    id: 1,
    name: "Acreditaciones",
    slug: "acreditaciones",
  },
  {
    id: 2,
    name: "Equipamiento",
    slug: "equipamiento",
  },
  {
    id: 3,
    name: "Eventos",
    slug: "eventos",
  },
  {
    id: 4,
    name: "Servicios",
    slug: "servicios",
  },
  {
    id: 5,
    name: "Investigación",
    slug: "investigacion",
  },
];

let mockPosts: NewsPost[] = [
  {
    id: "1",
    noticiaId: 1,
    categoryId: 1,
    categoryName: "Acreditaciones",
    title: "CAPN obtiene renovación de acreditación ISO/IEC 17025",
    content:
      "El laboratorio ha renovado exitosamente su acreditación internacional para análisis de alimentos, fortaleciendo la confiabilidad de sus resultados y la calidad de sus servicios.",
    coverImage: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "Certificado de acreditación CAPN",
    },
    publicationDate: "2024-01-15",
    isPublished: true,
    isFeatured: true,
    galleryImages: [],
  },
  {
    id: "2",
    noticiaId: 2,
    categoryId: 2,
    categoryName: "Equipamiento",
    title: "Nuevo equipo de espectrometría de masas instalado",
    content:
      "Incorporamos tecnología de última generación para análisis de contaminantes en alimentos y productos naturales.",
    coverImage: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "Equipo de espectrometría de masas",
    },
    publicationDate: "2024-01-13",
    isPublished: true,
    isFeatured: false,
    galleryImages: [],
  },
  {
    id: "3",
    noticiaId: 3,
    categoryId: 3,
    categoryName: "Eventos",
    title: "Participación en congreso internacional de seguridad alimentaria",
    content:
      "Nuestro equipo presentó investigaciones sobre métodos innovadores de detección y control de calidad alimentaria.",
    coverImage: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "Congreso internacional de seguridad alimentaria",
    },
    publicationDate: "2024-01-19",
    isPublished: false,
    isFeatured: false,
    galleryImages: [],
  },
];

function clonePost(post: NewsPost): NewsPost {
  return {
    ...post,
    coverImage: { ...post.coverImage },
    galleryImages: post.galleryImages.map((image) => ({ ...image })),
  };
}

function getCategoryName(categoryId: number | null): string {
  return mockCategories.find((category) => category.id === categoryId)?.name ?? "";
}

export const newsPostsService = {
  async listarCategorias(): Promise<NewsCategory[]> {
    return mockCategories;
  },

  async listarNoticias(): Promise<NewsPost[]> {
    return mockPosts.map(clonePost);
  },

  async crearNoticia(data: NewsPostForm): Promise<NewsPost> {
    const nextId = Date.now();

    const created: NewsPost = {
      ...data,
      id: String(nextId),
      noticiaId: nextId,
      categoryName: getCategoryName(data.categoryId),
    };

    mockPosts = [created, ...mockPosts];

    return clonePost(created);
  },

  async actualizarNoticia(data: NewsPostForm): Promise<NewsPost> {
    const updated: NewsPost = {
      ...data,
      categoryName: getCategoryName(data.categoryId),
    };

    mockPosts = mockPosts.map((post) =>
      post.id === data.id ? updated : post
    );

    return clonePost(updated);
  },

  async eliminarNoticia(id: string): Promise<void> {
    mockPosts = mockPosts.filter((post) => post.id !== id);
  },
};
