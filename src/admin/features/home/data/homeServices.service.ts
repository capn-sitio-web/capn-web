import type { HomeServices } from "../domain/home.types";

const mockHomeServices: HomeServices = {
  seccionId: null,
  sectionTitle: "Nuestros Servicios",
  sectionDescription:
    "Ofrecemos análisis especializados con tecnología de punta y personal altamente calificado.",
  cards: [
    {
      id: "1",
      icon: "flask",
      title: "Análisis Microbiológicos",
      description:
        "Detección de microorganismos indicadores y patógenos en alimentos y agua.",
    },
    {
      id: "2",
      icon: "utensils",
      title: "Análisis Fisicoquímicos",
      description:
        "Determinación de nutrientes y parámetros de calidad en alimentos.",
    },
    {
      id: "3",
      icon: "palette",
      title: "Análisis Sensoriales",
      description:
        "Evaluaciones con paneles de catadores entrenados para garantizar calidad.",
    },
    {
      id: "4",
      icon: "medical",
      title: "Análisis Especializados",
      description:
        "Residuos de plaguicidas, metales pesados, micotoxinas y más.",
    },
  ],
};

export const homeServicesService = {
  async obtenerServicios(): Promise<HomeServices> {
    return mockHomeServices;
  },

  async actualizarServicios(data: HomeServices): Promise<HomeServices> {
    return data;
  },
};
