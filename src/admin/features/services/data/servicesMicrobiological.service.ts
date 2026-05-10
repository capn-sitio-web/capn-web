import type { ServiceMicrobiological } from "../domain/services.types";

const mockMicrobiological: ServiceMicrobiological = {
  seccionId: null,
  sectionTitle: "Análisis Microbiológicos",
  sectionDescription:
    "Detección y cuantificación de microorganismos indicadores y patógenos en alimentos, agua y superficies de contacto con alimentos.",
  items: [
    {
      id: "1",
      text: "Microorganismos Indicadores",
    },
    {
      id: "2",
      text: "Patógenos",
    },
    {
      id: "3",
      text: "Mohos y Levaduras",
    },
    {
      id: "4",
      text: "Análisis de Agua",
    },
  ],
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Análisis microbiológicos en laboratorio",
  },
};

export const servicesMicrobiologicalService = {
  async obtenerMicrobiologico(): Promise<ServiceMicrobiological> {
    return mockMicrobiological;
  },

  async actualizarMicrobiologico(
    data: ServiceMicrobiological
  ): Promise<ServiceMicrobiological> {
    return data;
  },
};
