import { axiosClient } from "../../../config/axiosClient";
import type { HomeServices } from "../domain/home.types";

type HomeServicesApiPayload = {
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

type HomeServicesApiResponse = {
  message: string;
  data: HomeServicesApiPayload;
};

function mapHomeServicesFromApi(data: HomeServicesApiPayload): HomeServices {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    cards: data.cards.map((card) => ({
      id: card.id,
      elementId: card.elementId ?? null,
      icon: card.icon as HomeServices["cards"][number]["icon"],
      title: card.title,
      description: card.description,
    })),
  };
}

export const homeServicesService = {
  async obtenerServicios(): Promise<HomeServices> {
    const response = await axiosClient.get<HomeServicesApiResponse>("/home/services");
    return mapHomeServicesFromApi(response.data.data);
  },

  async actualizarServicios(data: HomeServices): Promise<HomeServices> {
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

    const response = await axiosClient.post<HomeServicesApiResponse>(
      "/home/services",
      payload
    );

    return mapHomeServicesFromApi(response.data.data);
  },
};
