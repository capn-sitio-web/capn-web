import { axiosClient } from "../../../config/axiosClient";
import type { ServiceEquipmentTechnology } from "../domain/services.types";

type ServiceEquipmentTechnologyApiPayload = {
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

type ServiceEquipmentTechnologyApiResponse = {
  message: string;
  data: ServiceEquipmentTechnologyApiPayload;
};

function mapServiceEquipmentTechnologyFromApi(
  data: ServiceEquipmentTechnologyApiPayload
): ServiceEquipmentTechnology {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    cards: data.cards.map((card) => ({
      id: card.id,
      elementId: card.elementId ?? null,
      icon: card.icon as ServiceEquipmentTechnology["cards"][number]["icon"],
      title: card.title,
      description: card.description,
    })),
  };
}

export const servicesEquipmentTechnologyService = {
  async obtenerEquiposTecnologia(): Promise<ServiceEquipmentTechnology> {
    const response = await axiosClient.get<ServiceEquipmentTechnologyApiResponse>(
      "/services/equipment-technology"
    );

    return mapServiceEquipmentTechnologyFromApi(response.data.data);
  },

  async actualizarEquiposTecnologia(
    data: ServiceEquipmentTechnology
  ): Promise<ServiceEquipmentTechnology> {
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

    const response = await axiosClient.post<ServiceEquipmentTechnologyApiResponse>(
      "/services/equipment-technology",
      payload
    );

    return mapServiceEquipmentTechnologyFromApi(response.data.data);
  },
};
