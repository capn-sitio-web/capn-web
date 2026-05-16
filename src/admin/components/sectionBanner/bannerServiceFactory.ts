import { axiosClient } from "../../config/axiosClient";
import type { SectionBannerData } from "./sectionBanner.types";

type BannerResponse = {
  message: string;
  data: {
    seccionId: number | null;
    sectionTitle: string;
    description: string;
    image: {
      previewUrl: string;
      imageId: number | null;
      alt: string;
    };
  };
};

function mapBanner(data: BannerResponse["data"]) {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    description: data.description ?? "",
    image: {
      file: null,
      previewUrl: data.image?.previewUrl ?? "",
      imageId: data.image?.imageId ?? null,
      alt: data.image?.alt ?? "",
    },
  };
}

export function createBannerService(endpoint: string) {
  return {
    async obtenerBanner() {
      const response = await axiosClient.get<BannerResponse>(endpoint);
      return mapBanner(response.data.data);
    },

    async actualizarBanner(
      data: SectionBannerData & { seccionId?: number | null }
    ) {
      const formData = new FormData();

      formData.append("sectionTitle", data.sectionTitle);
      formData.append("description", data.description);
      formData.append("image_alt", data.image.alt ?? "");

      if (data.image.file) {
        formData.append("image", data.image.file);
      }

      const response = await axiosClient.post<BannerResponse>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return mapBanner(response.data.data);
    },
  };
}
