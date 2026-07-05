import { axiosClient } from "../../../config/axiosClient";
import type { MissionVision } from "../domain/about.types";

type MissionVisionCardResponse = {
  id: string;
  elementId: number;
  key: string | null;
  icon: string;
  title: string;
  description: string;
};

type MissionVisionResponse = {
  message: string;
  data: {
    seccionId: number;
    sectionTitle: string;
    sectionDescription: string;
    cards: MissionVisionCardResponse[];
  };
};

type MissionVisionPayload = {
  sectionTitle: string;
  sectionDescription: string;
  cards: {
    elementId: number | null;
    key: string;
    icon: string;
    title: string;
    description: string;
  }[];
};

function mapResponseToMissionVision(
  response: MissionVisionResponse["data"]
): MissionVision {
  const missionCard = response.cards.find((card) => card.key === "mision");
  const visionCard = response.cards.find((card) => card.key === "vision");

  return {
    seccionId: response.seccionId,
    missionElementId: missionCard?.elementId ?? null,
    visionElementId: visionCard?.elementId ?? null,
    mission: missionCard?.description ?? "",
    vision: visionCard?.description ?? "",
  };
}

function mapMissionVisionToPayload(data: MissionVision): MissionVisionPayload {
  return {
    sectionTitle: "Misión y Visión",
    sectionDescription: "",
    cards: [
      {
        elementId: data.missionElementId,
        key: "mision",
        icon: "shield",
        title: "Nuestra Misión",
        description: data.mission,
      },
      {
        elementId: data.visionElementId,
        key: "vision",
        icon: "eye",
        title: "Nuestra Visión",
        description: data.vision,
      },
    ],
  };
}

export const aboutMissionVisionService = {
  obtenerMisionVision: async (): Promise<MissionVision> => {
    const response = await axiosClient.get<MissionVisionResponse>(
      "/about/mission-vision"
    );

    return mapResponseToMissionVision(response.data.data);
  },

  actualizarMisionVision: async (
    data: MissionVision
  ): Promise<MissionVision> => {
    const payload = mapMissionVisionToPayload(data);

    const response = await axiosClient.post<MissionVisionResponse>(
      "/about/mission-vision",
      payload
    );

    return mapResponseToMissionVision(response.data.data);
  },
};
