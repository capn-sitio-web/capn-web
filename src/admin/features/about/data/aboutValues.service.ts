import { axiosClient } from "../../../config/axiosClient";
import type { Values } from "../domain/about.types";

type ValuesApiPayload = {
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

type ValuesApiResponse = {
  message: string;
  data: ValuesApiPayload;
};

function mapValuesFromApi(data: ValuesApiPayload): Values {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    cards: data.cards.map((card) => ({
      id: card.id,
      elementId: card.elementId ?? null,
      icon: card.icon as Values["cards"][number]["icon"],
      title: card.title,
      description: card.description,
    })),
  };
}

export const aboutValuesService = {
  async obtenerValores(): Promise<Values> {
    const response = await axiosClient.get<ValuesApiResponse>("/about/values");
    return mapValuesFromApi(response.data.data);
  },

  async actualizarValores(data: Values): Promise<Values> {
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

    const response = await axiosClient.post<ValuesApiResponse>(
      "/about/values",
      payload
    );

    return mapValuesFromApi(response.data.data);
  },
};
