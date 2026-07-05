import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicAboutPageResponse } from "./about.types";

export const AboutService = {
  getAboutPage: async () => {
    const response = await publicAxiosClient.get<PublicAboutPageResponse>(
      "/nosotros"
    );

    return response.data.data;
  },
};
