import { axiosClient } from "../../../config/axiosClient";
import type { ServicePhysicochemical } from "../domain/services.types";

type ServicePhysicochemicalApiPayload = {
  seccionId: number | null;
  sectionTitle: string;
  sectionDescription: string;
  items: {
    id: string;
    text: string;
  }[];
  image: {
    previewUrl: string;
    imageId: number | null;
    alt: string;
  };
};

type ServicePhysicochemicalApiResponse = {
  message: string;
  data: ServicePhysicochemicalApiPayload;
};

function mapServicePhysicochemicalFromApi(
  data: ServicePhysicochemicalApiPayload
): ServicePhysicochemical {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    items: data.items.map((item) => ({
      id: item.id,
      text: item.text,
    })),
    image: {
      file: null,
      previewUrl: data.image?.previewUrl ?? "",
      imageId: data.image?.imageId ?? null,
      alt: data.image?.alt ?? "",
    },
  };
}

export const servicesPhysicochemicalService = {
  async obtenerFisicoquimico(): Promise<ServicePhysicochemical> {
    const response = await axiosClient.get<ServicePhysicochemicalApiResponse>(
      "/admin/services/physicochemical"
    );

    return mapServicePhysicochemicalFromApi(response.data.data);
  },

  async actualizarFisicoquimico(
    data: ServicePhysicochemical
  ): Promise<ServicePhysicochemical> {
    const formData = new FormData();

    formData.append("sectionTitle", data.sectionTitle);
    formData.append("sectionDescription", data.sectionDescription ?? "");
    formData.append("image_alt", data.image.alt ?? "");

    data.items.forEach((item, index) => {
      formData.append(`items[${index}][id]`, item.id);
      formData.append(`items[${index}][text]`, item.text);
    });

    if (data.image.file) {
      formData.append("image", data.image.file);
    }

    const response = await axiosClient.post<ServicePhysicochemicalApiResponse>(
      "/admin/services/physicochemical",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapServicePhysicochemicalFromApi(response.data.data);
  },
};
