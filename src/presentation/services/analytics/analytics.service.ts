import { publicAxiosClient } from "../../config/publicAxiosClient";
import type { PageViewPayload } from "./analytics.types";

export const analyticsService = {
  async registrarVisita(payload: PageViewPayload): Promise<void> {
    await publicAxiosClient.post("/analytics/page-view", payload);
  },
};
