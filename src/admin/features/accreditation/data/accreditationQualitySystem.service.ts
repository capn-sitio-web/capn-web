import type { AccreditationQualitySystem } from "../domain/accreditation.types";

const mockQualitySystem: AccreditationQualitySystem = {
  seccionId: null,
  sectionTitle: "Nuestro Sistema de Calidad",
  sectionDescription: "Garantizamos la confiabilidad en cada etapa del proceso",
  cards: [
    {
      id: "1",
      icon: "document",
      title: "1. Recepción",
      description: "Registro detallado de muestras con trazabilidad completa",
    },
    {
      id: "2",
      icon: "settings",
      title: "2. Preparación",
      description: "Acondicionamiento según protocolos estandarizados",
    },
    {
      id: "3",
      icon: "search",
      title: "3. Análisis",
      description: "Ensayos con métodos validados y equipos calibrados",
    },
    {
      id: "4",
      icon: "shield",
      title: "4. Validación",
      description: "Revisión técnica y emisión de informes certificados",
    },
  ],
};

export const accreditationQualitySystemService = {
  async obtenerSistemaCalidad(): Promise<AccreditationQualitySystem> {
    return mockQualitySystem;
  },

  async actualizarSistemaCalidad(
    data: AccreditationQualitySystem
  ): Promise<AccreditationQualitySystem> {
    return data;
  },
};
