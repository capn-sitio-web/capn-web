import { axiosClient } from "../../../config/axiosClient";
import type { ServiceWorkProcess } from "../domain/services.types";

type ServiceWorkProcessApiPayload = {
  seccionId: number | null;
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    id: string;
    elementId?: number | null;
    icon: string;
    title: string;
    description: string;
  }[];
};

type ServiceWorkProcessApiResponse = {
  message: string;
  data: ServiceWorkProcessApiPayload;
};

function mapServiceWorkProcessFromApi(
  data: ServiceWorkProcessApiPayload
): ServiceWorkProcess {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    cards: data.cards.map((card) => ({
      id: card.id,
      elementId: card.elementId ?? null,
      icon: card.icon as ServiceWorkProcess["cards"][number]["icon"],
      title: card.title,
      description: card.description,
    })),
  };
}

export const servicesWorkProcessService = {
  async obtenerProcesoTrabajo(): Promise<ServiceWorkProcess> {
    const response = await axiosClient.get<ServiceWorkProcessApiResponse>(
      "/services/work-process"
    );
    return mapServiceWorkProcessFromApi(response.data.data);
  },

  async actualizarProcesoTrabajo(
    data: ServiceWorkProcess
  ): Promise<ServiceWorkProcess> {
    const payload = {
      sectionTitle: data.sectionTitle,
      sectionDescription: data.sectionDescription ?? "",
      cards: data.cards.map((card) => ({
        id: card.id,
        elementId: card.elementId ?? null,
        icon: card.icon,
        title: card.title,
        description: card.description,
      })),
    };

    const response = await axiosClient.post<ServiceWorkProcessApiResponse>(
      "/services/work-process",
      payload
    );

    return mapServiceWorkProcessFromApi(response.data.data);
  },
};
