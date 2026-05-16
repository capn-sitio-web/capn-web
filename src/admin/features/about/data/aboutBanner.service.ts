import type { AboutBanner } from "../domain/about.types";

const mockAboutBanner: AboutBanner = {
  seccionId: null,
  sectionTitle: "Nosotros",
  description:
    "Conoce la historia, misión y el equipo que hace del CAPN el laboratorio de referencia en análisis de alimentos en Bolivia.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Equipo CAPN en laboratorio",
  },
};

export const aboutBannerService = {
  async obtenerBanner(): Promise<AboutBanner> {
    return mockAboutBanner;
  },

  async actualizarBanner(data: AboutBanner): Promise<AboutBanner> {
    return data;
  },
};
