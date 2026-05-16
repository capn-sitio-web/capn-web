import type { AccreditationBanner } from "../domain/accreditation.types";

const mockAccreditationBanner: AccreditationBanner = {
  seccionId: null,
  sectionTitle: "Acreditación y Calidad",
  description:
    "Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025, garantizando resultados confiables y reconocidos internacionalmente.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Acreditación y calidad CAPN",
  },
};

export const accreditationBannerService = {
  async obtenerBanner(): Promise<AccreditationBanner> {
    return mockAccreditationBanner;
  },

  async actualizarBanner(
    data: AccreditationBanner
  ): Promise<AccreditationBanner> {
    return data;
  },
};
