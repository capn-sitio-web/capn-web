import { axiosClient } from "../../../config/axiosClient";
import type {
  NewsCategory,
  NewsGalleryImage,
  NewsPost,
  NewsPostForm,
} from "../domain/news.types";

type CategoriaApi = {
  idcategoria_noticia: number;
  nombre: string;
  slug: string;
};

type ImagenNoticiaApi = {
  idimagen_noticia: number;
  noticia_idnoticia: number;
  imagen_url: string;
  imagen_alt: string | null;
  orden: number;
};

type NoticiaApi = {
  idnoticia: number;
  categoria_noticia_idcategoria_noticia: number;
  titulo: string;
  contenido: string;
  imagen_url: string | null;
  imagen_alt: string | null;
  fecha_publicacion: string;
  estado: boolean;
  es_destacada: boolean;
  categoria?: CategoriaApi | null;
  imagenes?: ImagenNoticiaApi[];
};

type ApiListResponse<T> = {
  message: string;
  data: T[];
};

type ApiItemResponse<T> = {
  message: string;
  data: T;
};

function getBackendBaseUrl(): string {
  const apiBaseUrl = String(axiosClient.defaults.baseURL ?? "");
  return apiBaseUrl.replace(/\/api\/?$/, "");
}

function toAbsoluteImageUrl(path: string | null | undefined): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${getBackendBaseUrl()}/${path.replace(/^\/+/, "")}`;
}

function normalizeDate(value: string | null | undefined): string {
  if (!value) return "";
  return value.slice(0, 10);
}

function mapCategoria(category: CategoriaApi): NewsCategory {
  return {
    id: category.idcategoria_noticia,
    name: category.nombre,
    slug: category.slug,
  };
}

function mapGalleryImages(images: ImagenNoticiaApi[] = []): NewsGalleryImage[] {
  return images.map((image) => ({
    id: String(image.idimagen_noticia),
    imageId: image.idimagen_noticia,
    file: null,
    previewUrl: toAbsoluteImageUrl(image.imagen_url),
    alt: image.imagen_alt ?? "",
    order: image.orden,
  }));
}

function mapNoticia(post: NoticiaApi): NewsPost {
  return {
    id: String(post.idnoticia),
    noticiaId: post.idnoticia,
    categoryId: post.categoria_noticia_idcategoria_noticia,
    categoryName: post.categoria?.nombre ?? "",
    title: post.titulo,
    content: post.contenido,
    coverImage: {
      file: null,
      previewUrl: toAbsoluteImageUrl(post.imagen_url),
      imageId: null,
      alt: post.imagen_alt ?? "",
    },
    publicationDate: normalizeDate(post.fecha_publicacion),
    isPublished: Boolean(post.estado),
    isFeatured: Boolean(post.es_destacada),
    galleryImages: mapGalleryImages(post.imagenes ?? []),
  };
}

function buildNewsFormData(form: NewsPostForm): FormData {
  const formData = new FormData();

  formData.append(
    "categoria_noticia_idcategoria_noticia",
    String(form.categoryId ?? "")
  );
  formData.append("titulo", form.title);
  formData.append("contenido", form.content);
  formData.append("fecha_publicacion", form.publicationDate);
  formData.append("estado", form.isPublished ? "1" : "0");
  formData.append("es_destacada", form.isFeatured ? "1" : "0");
  formData.append("imagen_alt", form.coverImage.alt ?? "");

  if (form.coverImage.file) {
    formData.append("imagen", form.coverImage.file);
  }

  return formData;
}

async function uploadGalleryImages(
  noticiaId: number,
  images: NewsGalleryImage[]
): Promise<void> {
  const newImages = images.filter((image) => image.file);

  await Promise.all(
    newImages.map(async (image) => {
      const formData = new FormData();
      formData.append("imagen", image.file as File);
      formData.append("imagen_alt", image.alt ?? "");
      formData.append("orden", String(image.order));

      await axiosClient.post(
        `/news/posts/${noticiaId}/images`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    })
  );
}

async function deleteGalleryImages(
  noticiaId: number,
  imageIds: number[]
): Promise<void> {
  await Promise.all(
    imageIds.map((imageId) =>
      axiosClient.delete(`/news/posts/${noticiaId}/images/${imageId}`)
    )
  );
}

export const newsPostsService = {
  async listarCategorias(): Promise<NewsCategory[]> {
    const response = await axiosClient.get<ApiListResponse<CategoriaApi>>(
      "/news/categories"
    );

    return response.data.data.map(mapCategoria);
  },

  async listarNoticias(): Promise<NewsPost[]> {
    const response = await axiosClient.get<ApiListResponse<NoticiaApi>>(
      "/news/posts"
    );

    return response.data.data.map(mapNoticia);
  },

  async obtenerNoticia(idnoticia: number): Promise<NewsPost> {
    const response = await axiosClient.get<ApiItemResponse<NoticiaApi>>(
      `/news/posts/${idnoticia}`
    );

    return mapNoticia(response.data.data);
  },

  async crearNoticia(form: NewsPostForm): Promise<NewsPost> {
    const formData = buildNewsFormData(form);

    const createResponse = await axiosClient.post<ApiItemResponse<NoticiaApi>>(
      "/news/posts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const noticiaId = createResponse.data.data.idnoticia;

    if (form.galleryImages.length > 0) {
      await uploadGalleryImages(noticiaId, form.galleryImages);
    }

    return this.obtenerNoticia(noticiaId);
  },

  async actualizarNoticia(form: NewsPostForm): Promise<NewsPost> {
    if (!form.noticiaId) {
      throw new Error("La noticia no tiene id para actualizar.");
    }

    const noticiaActual = await this.obtenerNoticia(form.noticiaId);

    const existingGalleryIds = noticiaActual.galleryImages
      .map((image) => image.imageId)
      .filter((imageId): imageId is number => imageId !== null);

    const nextGalleryIds = form.galleryImages
      .map((image) => image.imageId)
      .filter((imageId): imageId is number => imageId !== null);

    const deletedGalleryIds = existingGalleryIds.filter(
      (imageId) => !nextGalleryIds.includes(imageId)
    );

    const formData = buildNewsFormData(form);

    await axiosClient.post(
      `/news/posts/${form.noticiaId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (deletedGalleryIds.length > 0) {
      await deleteGalleryImages(form.noticiaId, deletedGalleryIds);
    }

    const newGalleryImages = form.galleryImages.filter(
      (image) => image.imageId === null && image.file
    );

    if (newGalleryImages.length > 0) {
      await uploadGalleryImages(form.noticiaId, newGalleryImages);
    }

    return this.obtenerNoticia(form.noticiaId);
  },

  async eliminarNoticia(id: string | number): Promise<void> {
    await axiosClient.delete(`/news/posts/${id}`);
  },
};
