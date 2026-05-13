import { axiosClient } from "../../../config/axiosClient";
import type { ContactInfo } from "../domain/contact.types";

type ContactInfoApiPayload = {
  seccionId: number | null;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  mapEmbedUrl: string;
};

type ContactInfoApiResponse = {
  message: string;
  data: ContactInfoApiPayload;
};

function mapContactInfoFromApi(data: ContactInfoApiPayload): ContactInfo {
  return {
    seccionId: data.seccionId,
    address: data.address ?? "",
    phone: data.phone ?? "",
    email: data.email ?? "",
    facebookUrl: data.facebookUrl ?? "",
    mapEmbedUrl: data.mapEmbedUrl ?? "",
  };
}

export const contactInfoService = {
  async obtenerInformacionContacto(): Promise<ContactInfo> {
    const response = await axiosClient.get<ContactInfoApiResponse>(
      "/admin/contactos/"
    );

    return mapContactInfoFromApi(response.data.data);
  },

  async actualizarInformacionContacto(
    data: ContactInfo
  ): Promise<ContactInfo> {
    const payload = {
      address: data.address,
      phone: data.phone,
      email: data.email,
      facebookUrl: data.facebookUrl ?? "",
      mapEmbedUrl: data.mapEmbedUrl,
    };

    const response = await axiosClient.post<ContactInfoApiResponse>(
      "/admin/contactos/",
      payload
    );

    return mapContactInfoFromApi(response.data.data);
  },
};
