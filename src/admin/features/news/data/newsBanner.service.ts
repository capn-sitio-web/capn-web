import type { NewsBanner } from "../domain/news.types";

const mockNewsBanner: NewsBanner = {
  seccionId: null,
  sectionTitle: "Noticias y Publicaciones",
  description:
    "Mantente informado sobre nuestros logros, nuevas acreditaciones, investigaciones y actividades del CAPN.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Noticias y publicaciones CAPN",
  },
};

export const newsBannerService = {
  async obtenerBanner(): Promise<NewsBanner> {
    return mockNewsBanner;
  },

  async actualizarBanner(data: NewsBanner): Promise<NewsBanner> {
    return data;
  },
};
