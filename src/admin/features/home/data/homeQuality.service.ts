import type { HomeQuality } from "../domain/home.types";

const mockHomeQuality: HomeQuality = {
  seccionId: null,
  sectionTitle: "Calidad Certificada",
  sectionDescription:
    "Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025 para análisis de alimentos, garantizando resultados confiables y reconocidos internacionalmente.",
  items: [
    {
      id: "1",
      text: "Certificación ISO/IEC 17025",
    },
    {
      id: "2",
      text: "Personal técnico especializado",
    },
    {
      id: "3",
      text: "Equipos de última generación",
    },
    {
      id: "4",
      text: "Resultados internacionalmente válidos",
    },
  ],
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Laboratorio certificado CAPN",
  },
};

export const homeQualityService = {
  async obtenerCalidad(): Promise<HomeQuality> {
    return mockHomeQuality;
  },

  async actualizarCalidad(data: HomeQuality): Promise<HomeQuality> {
    return data;
  },
};
