import type { ServiceSpecialized } from "../domain/services.types";

const mockSpecialized: ServiceSpecialized = {
  seccionId: null,
  sectionTitle: "Análisis Especializado",
  sectionDescription:
    "Determinación de contaminantes y compuestos específicos mediante técnicas analíticas avanzadas de cromatografía y espectrometría.",
  items: [
    {
      id: "1",
      text: "Residuos de Plaguicidas",
    },
    {
      id: "2",
      text: "Metales Pesados",
    },
    {
      id: "3",
      text: "Micotoxinas",
    },
    {
      id: "4",
      text: "Compuestos Bioactivos",
    },
  ],
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Análisis especializado en laboratorio",
  },
};

export const servicesSpecializedService = {
  async obtenerEspecializado(): Promise<ServiceSpecialized> {
    return mockSpecialized;
  },

  async actualizarEspecializado(
    data: ServiceSpecialized
  ): Promise<ServiceSpecialized> {
    return data;
  },
};
