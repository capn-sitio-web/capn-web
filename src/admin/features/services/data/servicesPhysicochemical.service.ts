import { axiosClient } from "../../../config/axiosClient";
import type { ServicePhysicochemical } from "../domain/services.types";
import {
  buildServiceAnalysisFormData,
  mapServiceAnalysisFromApi,
  type ServiceAnalysisApiResponse,
} from "./servicesAnalysis.helpers";

export const servicesPhysicochemicalService = {
  async obtenerFisicoquimico(): Promise<ServicePhysicochemical> {
    const response = await axiosClient.get<ServiceAnalysisApiResponse>(
      "/services/physicochemical"
    );
    return mapServiceAnalysisFromApi<ServicePhysicochemical>(response.data.data);
  },

  async actualizarFisicoquimico(
    data: ServicePhysicochemical
  ): Promise<ServicePhysicochemical> {
    const formData = buildServiceAnalysisFormData(data);
    const response = await axiosClient.post<ServiceAnalysisApiResponse>(
      "/services/physicochemical",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return mapServiceAnalysisFromApi<ServicePhysicochemical>(response.data.data);
  },
};
