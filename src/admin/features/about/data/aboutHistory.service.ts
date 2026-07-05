import { axiosClient } from "../../../config/axiosClient";
import type { History } from "../domain/about.types";

type GetHistoryResponse = {
  message: string;
  data: {
    seccionId: number | null;
    sectionTitle: string;
    description: string;
    image: {
      imageId: number | null;
      previewUrl: string;
      alt: string;
    };
  };
};

type SaveHistoryResponse = GetHistoryResponse;

export const aboutHistoryService = {
  async obtenerHistoria(): Promise<History> {
    const response = await axiosClient.get<GetHistoryResponse>("/about/history");
    const data = response.data.data;

    return {
      seccionId: data.seccionId,
      sectionTitle: data.sectionTitle,
      description: data.description,
      image: {
        file: null,
        previewUrl: data.image?.previewUrl ?? "",
        imageId: data.image?.imageId ?? null,
        alt: data.image?.alt ?? "",
      },
    };
  },

  async actualizarHistoria(data: History): Promise<History> {
    const formData = new FormData();

    formData.append("sectionTitle", data.sectionTitle);
    formData.append("description", data.description);
    formData.append("image_alt", data.image.alt);

    if (data.image.file) {
      formData.append("image", data.image.file);
    }

    const response = await axiosClient.post<SaveHistoryResponse>(
      "/about/history",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const saved = response.data.data;

    return {
      seccionId: saved.seccionId,
      sectionTitle: saved.sectionTitle,
      description: saved.description,
      image: {
        file: null,
        previewUrl: saved.image?.previewUrl ?? "",
        imageId: saved.image?.imageId ?? null,
        alt: saved.image?.alt ?? "",
      },
    };
  },
};