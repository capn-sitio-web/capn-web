import type { ContactInfo } from "../domain/contact.types";

const mockContactInfo: ContactInfo = {
  seccionId: null,
  address: "UMSS - Facultad de Ciencias y Tecnología, Cochabamba, Bolivia",
  phone: "+591 4 4234567",
  email: "capn@umss.edu.bo",
  facebookUrl: "https://www.facebook.com/",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...",
};

export const contactInfoService = {
  async obtenerInformacionContacto(): Promise<ContactInfo> {
    return mockContactInfo;
  },

  async actualizarInformacionContacto(data: ContactInfo): Promise<ContactInfo> {
    return data;
  },
};
