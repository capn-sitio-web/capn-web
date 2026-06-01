import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicServicesPageResponse } from "./services.types";

export const ServicesService = {
  getServicesPage: async () => {
    const response = await publicAxiosClient.get<PublicServicesPageResponse>(
      "/public/servicios"
    );

    return response.data.data;
  },
};
