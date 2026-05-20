import { publicAxiosClient } from "../../config/publicAxiosClient";

import type {
  PublicBannerResponse,
  PublicSectionResponse,
} from "../public.types";

export const AccreditationService = {
  getBanner: async () => {
    const response = await publicAxiosClient.get<PublicBannerResponse>(
      "/public/acreditacion/banner"
    );

    return response.data.data;
  },

  getSistemaCalidad: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/acreditacion/sistema-calidad"
    );

    return response.data.data;
  },
};
