import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicServicesPageResponse, PublicServiceDetailResponse } from "./services.types";

export const ServicesService = {
  getServicesPage: async () => {
    const response = await publicAxiosClient.get<PublicServicesPageResponse>(
      "/public/servicios"
    );
    return response.data.data;
  },

  getServiceDetail: async (slug: string) => {
    const response = await publicAxiosClient.get<PublicServiceDetailResponse>(
      `/public/servicios/detalle/${slug}`
    );
    return response.data.data;
  },
};
