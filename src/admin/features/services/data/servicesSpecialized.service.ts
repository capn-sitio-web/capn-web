import { axiosClient } from "../../../config/axiosClient";
import type { ServiceSpecialized } from "../domain/services.types";
import {
  buildServiceAnalysisFormData,
  mapServiceAnalysisFromApi,
  type ServiceAnalysisApiResponse,
} from "./servicesAnalysis.helpers";

export const servicesSpecializedService = {
  async obtenerEspecializado(): Promise<ServiceSpecialized> {
    const response = await axiosClient.get<ServiceAnalysisApiResponse>(
      "/services/specialized"
    );
    return mapServiceAnalysisFromApi<ServiceSpecialized>(response.data.data);
  },

  async actualizarEspecializado(
    data: ServiceSpecialized
  ): Promise<ServiceSpecialized> {
    const formData = buildServiceAnalysisFormData(data);
    const response = await axiosClient.post<ServiceAnalysisApiResponse>(
      "/services/specialized",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return mapServiceAnalysisFromApi<ServiceSpecialized>(response.data.data);
  },
};
