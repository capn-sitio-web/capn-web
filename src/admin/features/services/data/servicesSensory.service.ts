import { axiosClient } from "../../../config/axiosClient";
import type { ServiceSensory } from "../domain/services.types";

type ServiceSensoryApiPayload = {
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

type ServiceSensoryApiResponse = {
  message: string;
  data: ServiceSensoryApiPayload;
};

function mapServiceSensoryFromApi(
  data: ServiceSensoryApiPayload
): ServiceSensory {
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

export const servicesSensoryService = {
  async obtenerSensorial(): Promise<ServiceSensory> {
    const response = await axiosClient.get<ServiceSensoryApiResponse>(
      "/admin/services/sensory"
    );

    return mapServiceSensoryFromApi(response.data.data);
  },

  async actualizarSensorial(
    data: ServiceSensory
  ): Promise<ServiceSensory> {
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

    const response = await axiosClient.post<ServiceSensoryApiResponse>(
      "/admin/services/sensory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapServiceSensoryFromApi(response.data.data);
  },
};
