import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicHomePageResponse } from "./home.types";

export const HomeService = {
  getHomePage: async () => {
    const response = await publicAxiosClient.get<PublicHomePageResponse>(
      "/inicio"
    );
    return response.data.data;
  },
};
