import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicBannerResponse, PublicSectionResponse } from "./about.types";

export const AboutService = {
  getBanner: async () => {
    const response = await publicAxiosClient.get<PublicBannerResponse>(
      "/public/nosotros/banner"
    );

    return response.data.data;
  },

  getNuestraHistoria: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/nosotros/nuestra-historia"
    );

    return response.data.data;
  },

  getMisionYVision: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/nosotros/mision-y-vision"
    );

    return response.data.data;
  },

  getNuestrosValores: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/nosotros/nuestros-valores"
    );

    return response.data.data;
  },

  getNuestroEquipo: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/nosotros/nuestro-equipo"
    );

    return response.data.data;
  },
};
