import type { ServiceEquipmentTechnology } from "../domain/services.types";

const mockEquipmentTechnology: ServiceEquipmentTechnology = {
  seccionId: null,
  sectionTitle: "Equipos y Tecnología",
  sectionDescription:
    "Instrumentación de última generación para análisis precisos",
  cards: [
    {
      id: "1",
      icon: "flask",
      title: "Cromatógrafo de Gases",
      description:
        "Shimadzu GC-2010 con detectores FID y ECD para análisis de residuos de plaguicidas.",
    },
    {
      id: "2",
      icon: "microscope",
      title: "Cromatógrafo Líquido",
      description:
        "HPLC Agilent 1260 para determinación de vitaminas y micotoxinas.",
    },
    {
      id: "3",
      icon: "flask",
      title: "Espectrofotómetro",
      description:
        "UV-Vis Thermo Scientific para análisis de composición y contaminantes.",
    },
    {
      id: "4",
      icon: "snowflake",
      title: "Liofilizador",
      description:
        "Labconco para preparación de muestras y conservación de estándares.",
    },
    {
      id: "5",
      icon: "water",
      title: "Digestor por Microondas",
      description:
        "CEM Mars 6 para digestión de muestras en análisis de metales pesados.",
    },
    {
      id: "6",
      icon: "scale",
      title: "Balanza Analítica",
      description:
        "Mettler Toledo con precisión de 0.1 mg para preparación exacta de muestras.",
    },
  ],
};

export const servicesEquipmentTechnologyService = {
  async obtenerEquiposTecnologia(): Promise<ServiceEquipmentTechnology> {
    return mockEquipmentTechnology;
  },

  async actualizarEquiposTecnologia(
    data: ServiceEquipmentTechnology
  ): Promise<ServiceEquipmentTechnology> {
    return data;
  },
};
