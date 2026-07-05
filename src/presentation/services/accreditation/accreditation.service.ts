import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicAccreditationPageResponse } from "./accreditation.types";

export const AccreditationService = {
  getAccreditationPage: async () => {
    const response = await publicAxiosClient.get<PublicAccreditationPageResponse>(
      "/acreditacion"
    );

    return response.data.data;
  },
};
