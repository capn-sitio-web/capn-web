import { axiosClient } from "../../../config/axiosClient";
import type { ServiceMicrobiological } from "../domain/services.types";
import {
  buildServiceAnalysisFormData,
  mapServiceAnalysisFromApi,
  type ServiceAnalysisApiResponse,
} from "./servicesAnalysis.helpers";

export const servicesMicrobiologicalService = {
  async obtenerMicrobiologico(): Promise<ServiceMicrobiological> {
    const response = await axiosClient.get<ServiceAnalysisApiResponse>(
      "/services/microbiological"
    );
    return mapServiceAnalysisFromApi<ServiceMicrobiological>(response.data.data);
  },

  async actualizarMicrobiologico(
    data: ServiceMicrobiological
  ): Promise<ServiceMicrobiological> {
    const formData = buildServiceAnalysisFormData(data);
    const response = await axiosClient.post<ServiceAnalysisApiResponse>(
      "/services/microbiological",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return mapServiceAnalysisFromApi<ServiceMicrobiological>(response.data.data);
  },
};
