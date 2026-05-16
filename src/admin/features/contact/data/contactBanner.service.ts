import type { ContactBanner } from "../domain/contact.types";

const mockContactBanner: ContactBanner = {
  seccionId: null,
  sectionTitle: "Contacto",
  description:
    "Estamos aquí para ayudarte con todos tus requerimientos de análisis de alimentos.",
  image: {
    file: null,
    previewUrl: "",
    imageId: null,
    alt: "Contacto CAPN",
  },
};

export const contactBannerService = {
  async obtenerBanner(): Promise<ContactBanner> {
    return mockContactBanner;
  },

  async actualizarBanner(data: ContactBanner): Promise<ContactBanner> {
    return data;
  },
};
