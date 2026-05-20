import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicBannerResponse, PublicSectionResponse } from "./home.types";

export const HomeService = {
  getBanner: async () => {
    const response = await publicAxiosClient.get<PublicBannerResponse>(
      "/public/inicio/banner"
    );

    return response.data.data;
  },

  getNuestrosServicios: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/inicio/nuestros-servicios"
    );

    return response.data.data;
  },

  getCalidadCertificada: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/inicio/calidad-certificada"
    );

    return response.data.data;
  },
};
