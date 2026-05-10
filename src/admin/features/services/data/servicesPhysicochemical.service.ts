import type { ServicePhysicochemical } from "../domain/services.types";

const mockPhysicochemical: ServicePhysicochemical = {
  seccionId: null,
  sectionTitle: "Análisis Fisicoquímico",
  sectionDescription:
    "Determinación de componentes nutricionales y parámetros de calidad en alimentos procesados y materias primas.",
  items: [
    {
      id: "1",
      text: "Composición Proximal",
    },
    {
      id: "2",
      text: "Parámetros de Calidad",
    },
    {
      id: "3",
      text: "Vitaminas y Minerales",
    },
    {
      id: "4",
      text: "Perfil Lipídico",
    },
  ],
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Análisis fisicoquímico en laboratorio",
  },
};

export const servicesPhysicochemicalService = {
  async obtenerFisicoquimico(): Promise<ServicePhysicochemical> {
    return mockPhysicochemical;
  },

  async actualizarFisicoquimico(
    data: ServicePhysicochemical
  ): Promise<ServicePhysicochemical> {
    return data;
  },
};
