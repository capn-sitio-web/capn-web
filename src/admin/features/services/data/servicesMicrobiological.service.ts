import { axiosClient } from "../../../config/axiosClient";
import type { ServiceMicrobiological } from "../domain/services.types";

type ServiceMicrobiologicalApiPayload = {
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

type ServiceMicrobiologicalApiResponse = {
  message: string;
  data: ServiceMicrobiologicalApiPayload;
};

function mapServiceMicrobiologicalFromApi(
  data: ServiceMicrobiologicalApiPayload
): ServiceMicrobiological {
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

export const servicesMicrobiologicalService = {
  async obtenerMicrobiologico(): Promise<ServiceMicrobiological> {
    const response = await axiosClient.get<ServiceMicrobiologicalApiResponse>(
      "/admin/services/microbiological"
    );
    return mapServiceMicrobiologicalFromApi(response.data.data);
  },

  async actualizarMicrobiologico(
    data: ServiceMicrobiological
  ): Promise<ServiceMicrobiological> {
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

    const response = await axiosClient.post<ServiceMicrobiologicalApiResponse>(
      "/admin/services/microbiological",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapServiceMicrobiologicalFromApi(response.data.data);
  },
};
