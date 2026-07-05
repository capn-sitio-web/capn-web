import { axiosClient } from "../../../config/axiosClient";
import type { HomeQuality } from "../domain/home.types";

type HomeQualityApiPayload = {
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

type HomeQualityApiResponse = {
  message: string;
  data: HomeQualityApiPayload;
};

function mapHomeQualityFromApi(data: HomeQualityApiPayload): HomeQuality {
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

export const homeQualityService = {
  async obtenerCalidad(): Promise<HomeQuality> {
    const response = await axiosClient.get<HomeQualityApiResponse>("/home/quality");
    return mapHomeQualityFromApi(response.data.data);
  },

  async actualizarCalidad(data: HomeQuality): Promise<HomeQuality> {
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

    const response = await axiosClient.post<HomeQualityApiResponse>(
      "/home/quality",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapHomeQualityFromApi(response.data.data);
  },
};
