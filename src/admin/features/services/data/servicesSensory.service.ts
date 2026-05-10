import type { ServiceSensory } from "../domain/services.types";

const mockSensory: ServiceSensory = {
  seccionId: null,
  sectionTitle: "Análisis Sensorial",
  sectionDescription:
    "Evaluación de la calidad sensorial de alimentos mediante paneles de catadores entrenados y metodologías estandarizadas.",
  items: [
    {
      id: "1",
      text: "Análisis Descriptivo",
    },
    {
      id: "2",
      text: "Pruebas de Preferencia",
    },
    {
      id: "3",
      text: "Pruebas Discriminativas",
    },
    {
      id: "4",
      text: "Vida Útil Sensorial",
    },
  ],
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Análisis sensorial de alimentos",
  },
};

export const servicesSensoryService = {
  async obtenerSensorial(): Promise<ServiceSensory> {
    return mockSensory;
  },

  async actualizarSensorial(data: ServiceSensory): Promise<ServiceSensory> {
    return data;
  },
};
