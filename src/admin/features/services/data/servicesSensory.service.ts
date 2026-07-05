import { axiosClient } from "../../../config/axiosClient";
import type { ServiceSensory } from "../domain/services.types";
import {
  buildServiceAnalysisFormData,
  mapServiceAnalysisFromApi,
  type ServiceAnalysisApiResponse,
} from "./servicesAnalysis.helpers";

export const servicesSensoryService = {
  async obtenerSensorial(): Promise<ServiceSensory> {
    const response = await axiosClient.get<ServiceAnalysisApiResponse>(
      "/admin/services/sensory"
    );
    return mapServiceAnalysisFromApi<ServiceSensory>(response.data.data);
  },

  async actualizarSensorial(data: ServiceSensory): Promise<ServiceSensory> {
    const formData = buildServiceAnalysisFormData(data);
    const response = await axiosClient.post<ServiceAnalysisApiResponse>(
      "/admin/services/sensory",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return mapServiceAnalysisFromApi<ServiceSensory>(response.data.data);
  },
};
