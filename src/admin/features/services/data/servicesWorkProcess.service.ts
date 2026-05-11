import type { ServiceWorkProcess } from "../domain/services.types";

const mockWorkProcess: ServiceWorkProcess = {
  seccionId: null,
  sectionTitle: "Nuestro Proceso de Trabajo",
  sectionDescription: "Metodología rigurosa para garantizar resultados confiables",
  cards: [
    {
      id: "1",
      icon: "document",
      title: "Recepción de Muestra",
      description:
        "Registro detallado y verificación de condiciones de la muestra según protocolos establecidos.",
    },
    {
      id: "2",
      icon: "settings",
      title: "Preparación",
      description:
        "Acondicionamiento y preparación de la muestra según metodologías validadas.",
    },
    {
      id: "3",
      icon: "search",
      title: "Análisis",
      description:
        "Ejecución de ensayos con equipos calibrados y personal especializado.",
    },
    {
      id: "4",
      icon: "check",
      title: "Entrega de Resultados",
      description:
        "Informe técnico validado con interpretación de resultados y recomendaciones.",
    },
  ],
};

export const servicesWorkProcessService = {
  async obtenerProcesoTrabajo(): Promise<ServiceWorkProcess> {
    return mockWorkProcess;
  },

  async actualizarProcesoTrabajo(
    data: ServiceWorkProcess
  ): Promise<ServiceWorkProcess> {
    return data;
  },
};
