import { publicAxiosClient } from "../../config/publicAxiosClient";

import type {
  PublicBannerResponse,
  PublicSectionResponse,
} from "../public.types";

export const ContactService = {
  getBanner: async () => {
    const response = await publicAxiosClient.get<PublicBannerResponse>(
      "/public/contacto/banner"
    );

    return response.data.data;
  },

  getInformacion: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/contacto/informacion"
    );

    return response.data.data;
  },
};
