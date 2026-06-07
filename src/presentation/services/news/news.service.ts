import { publicAxiosClient } from "../../config/publicAxiosClient";

import type {
  PublicNewsPageResponse,
  PublicNewsDetailResponse,
} from "./news.types";

type GetNewsPageParams = {
  page?: number;
  category?: string | null;
};

export const NewsService = {
  getNewsPage: async ({ page = 1, category = null }: GetNewsPageParams) => {
    const response = await publicAxiosClient.get<PublicNewsPageResponse>(
      "/public/noticias",
      {
        params: {
          page,
          ...(category ? { categoria: category } : {}),
        },
      }
    );

    return response.data.data;
  },

  getNewsDetail: async (idnoticia: number) => {
    const response = await publicAxiosClient.get<PublicNewsDetailResponse>(
      `/public/noticias/${idnoticia}`
    );

    return response.data.data;
  },
};
