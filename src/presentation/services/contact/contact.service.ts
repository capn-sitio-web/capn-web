import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PublicContactPageResponse } from "./contact.types";

export const ContactService = {
  getContactPage: async () => {
    const response = await publicAxiosClient.get<PublicContactPageResponse>(
      "/contacto"
    );
    return response.data.data;
  },
};
