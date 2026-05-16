import type { ServicesBanner } from "../domain/services.types";

const mockServicesBanner: ServicesBanner = {
  seccionId: null,
  sectionTitle: "Nuestros Servicios",
  description:
    "Ofrecemos análisis especializados con tecnología de punta y metodologías certificadas internacionalmente.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Servicios de análisis en laboratorio",
  },
};

export const servicesBannerService = {
  async obtenerBanner(): Promise<ServicesBanner> {
    return mockServicesBanner;
  },

  async actualizarBanner(data: ServicesBanner): Promise<ServicesBanner> {
    return data;
  },
};
