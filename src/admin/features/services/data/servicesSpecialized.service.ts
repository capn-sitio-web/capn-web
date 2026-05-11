import { axiosClient } from "../../../config/axiosClient";
import type { ServiceSpecialized } from "../domain/services.types";

type ServiceSpecializedApiPayload = {
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

type ServiceSpecializedApiResponse = {
  message: string;
  data: ServiceSpecializedApiPayload;
};

function mapServiceSpecializedFromApi(
  data: ServiceSpecializedApiPayload
): ServiceSpecialized {
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

export const servicesSpecializedService = {
  async obtenerEspecializado(): Promise<ServiceSpecialized> {
    const response = await axiosClient.get<ServiceSpecializedApiResponse>(
      "/admin/services/specialized"
    );

    return mapServiceSpecializedFromApi(response.data.data);
  },

  async actualizarEspecializado(
    data: ServiceSpecialized
  ): Promise<ServiceSpecialized> {
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

    const response = await axiosClient.post<ServiceSpecializedApiResponse>(
      "/admin/services/specialized",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapServiceSpecializedFromApi(response.data.data);
  },
};
