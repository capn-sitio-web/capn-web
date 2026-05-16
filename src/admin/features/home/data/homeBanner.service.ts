import type { HomeBanner } from "../domain/home.types";

const mockHomeBanner: HomeBanner = {
  seccionId: null,
  sectionTitle: "Centro de Alimentos y Productos Naturales",
  description:
    "Laboratorio especializado en análisis microbiológicos, fisicoquímicos y sensoriales. Certificado ISO/IEC 17025 para garantizar la calidad y seguridad alimentaria.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Portada principal CAPN",
  },
};

export const homeBannerService = {
  async obtenerBanner(): Promise<HomeBanner> {
    return mockHomeBanner;
  },

  async actualizarBanner(data: HomeBanner): Promise<HomeBanner> {
    return data;
  },
};
