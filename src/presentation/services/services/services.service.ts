import { publicAxiosClient } from "../../config/publicAxiosClient";

import type {
  PublicBannerResponse,
  PublicSectionResponse,
} from "../public.types";

export const ServicesService = {
  getBanner: async () => {
    const response = await publicAxiosClient.get<PublicBannerResponse>(
      "/public/servicios/banner"
    );

    return response.data.data;
  },

  getAnalisisMicrobiologico: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/analisis-microbiologico"
    );

    return response.data.data;
  },

  getAnalisisFisicoquimico: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/analisis-fisicoquimico"
    );

    return response.data.data;
  },

  getAnalisisSensorial: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/analisis-sensorial"
    );

    return response.data.data;
  },

  getAnalisisEspecializado: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/analisis-especializado"
    );

    return response.data.data;
  },

  getProcesoTrabajo: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/proceso-trabajo"
    );

    return response.data.data;
  },

  getEquiposTecnologia: async () => {
    const response = await publicAxiosClient.get<PublicSectionResponse>(
      "/public/servicios/equipos-tecnologia"
    );

    return response.data.data;
  },
};
