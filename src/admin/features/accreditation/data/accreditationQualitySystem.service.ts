import { axiosClient } from "../../../config/axiosClient";
import type { AccreditationQualitySystem } from "../domain/accreditation.types";

type AccreditationQualitySystemApiPayload = {
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

type AccreditationQualitySystemApiResponse = {
  message: string;
  data: AccreditationQualitySystemApiPayload;
};

function mapQualitySystemFromApi(
  data: AccreditationQualitySystemApiPayload
): AccreditationQualitySystem {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    cards: data.cards.map((card) => ({
      id: card.id,
      elementId: card.elementId ?? null,
      icon: card.icon as AccreditationQualitySystem["cards"][number]["icon"],
      title: card.title,
      description: card.description,
    })),
  };
}

export const accreditationQualitySystemService = {
  async obtenerSistemaCalidad(): Promise<AccreditationQualitySystem> {
    const response = await axiosClient.get<AccreditationQualitySystemApiResponse>(
      "/accreditation/quality-system"
    );

    return mapQualitySystemFromApi(response.data.data);
  },

  async actualizarSistemaCalidad(
    data: AccreditationQualitySystem
  ): Promise<AccreditationQualitySystem> {
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

    const response = await axiosClient.post<AccreditationQualitySystemApiResponse>(
      "/accreditation/quality-system",
      payload
    );

    return mapQualitySystemFromApi(response.data.data);
  },
};
