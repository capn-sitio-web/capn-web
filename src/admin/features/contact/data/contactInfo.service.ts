import { axiosClient } from "../../../config/axiosClient";
import type { ContactInfo, ContactSocialType } from "../domain/contact.types";

type ContactInfoApiPayload = {
  seccionId: number | null;
  address: string;
  businessHours: string;
  latitud: number;
  longitud: number;
  phones: {
    id: number | null;
    value: string;
    isPrimary: boolean;
    order: number;
  }[];
  emails: {
    id: number | null;
    value: string;
    isPrimary: boolean;
    order: number;
  }[];
  socialLinks: {
    id?: number | null;
    type: ContactSocialType;
    url: string;
    order: number;
  }[];
};

type ContactInfoApiResponse = {
  message: string;
  data: ContactInfoApiPayload;
};

function mapContactInfoFromApi(data: ContactInfoApiPayload): ContactInfo {
  return {
    seccionId: data.seccionId,
    address: data.address ?? "",
    businessHours: data.businessHours ?? "",
    latitud: Number(data.latitud ?? -17.39343750),
    longitud: Number(data.longitud ?? -66.14856250),
    phones:
      data.phones?.length > 0
        ? data.phones.map((phone, index) => ({
            id: phone.id ?? null,
            value: phone.value ?? "",
            isPrimary: Boolean(phone.isPrimary),
            order: phone.order ?? index + 1,
          }))
        : [{ id: null, value: "", isPrimary: true, order: 1 }],
    emails:
      data.emails?.length > 0
        ? data.emails.map((email, index) => ({
            id: email.id ?? null,
            value: email.value ?? "",
            isPrimary: Boolean(email.isPrimary),
            order: email.order ?? index + 1,
          }))
        : [{ id: null, value: "", isPrimary: true, order: 1 }],
    socialLinks:
      data.socialLinks?.map((social, index) => ({
        id: social.id ?? null,
        type: social.type,
        url: social.url ?? "",
        order: social.order ?? index + 1,
      })) ?? [],
  };
}

export const contactInfoService = {
  async obtenerInformacionContacto(): Promise<ContactInfo> {
    const response = await axiosClient.get<ContactInfoApiResponse>(
      "/contactos/"
    );

    return mapContactInfoFromApi(response.data.data);
  },

  async actualizarInformacionContacto(data: ContactInfo): Promise<ContactInfo> {
    const payload = {
      address: data.address,
      businessHours: data.businessHours,
      latitud: data.latitud,
      longitud: data.longitud,
      phones: data.phones.map((phone, index) => ({
        id: phone.id,
        value: phone.value,
        isPrimary: phone.isPrimary,
        order: index + 1,
      })),
      emails: data.emails.map((email, index) => ({
        id: email.id,
        value: email.value,
        isPrimary: email.isPrimary,
        order: index + 1,
      })),
      socialLinks: data.socialLinks.map((social, index) => ({
        id: social.id,
        type: social.type,
        url: social.url,
        order: index + 1,
      })),
    };

    const response = await axiosClient.post<ContactInfoApiResponse>(
      "/contactos/",
      payload
    );

    return mapContactInfoFromApi(response.data.data);
  },
};
