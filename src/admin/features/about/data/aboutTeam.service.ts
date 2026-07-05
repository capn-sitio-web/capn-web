import { axiosClient } from "../../../config/axiosClient";
import type { Team } from "../domain/about.types";

type TeamApiPayload = {
  seccionId: number | null;
  sectionTitle: string;
  sectionDescription: string;
  members: {
    id: string;
    personalId?: number | null;
    image: {
      previewUrl: string;
      alt: string;
    };
    name: string;
    position: string;
    description: string;
  }[];
};

type TeamApiResponse = {
  message: string;
  data: TeamApiPayload;
};

function mapTeamFromApi(data: TeamApiPayload): Team {
  return {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    members: data.members.map((member) => ({
      id: member.id,
      personalId: member.personalId ?? null,
      image: {
        file: null,
        previewUrl: member.image?.previewUrl ?? "",
        imageId: null,
        alt: member.image?.alt ?? "",
      },
      name: member.name,
      position: member.position,
      description: member.description,
    })),
  };
}

export const aboutTeamService = {
  async obtenerEquipo(): Promise<Team> {
    const response = await axiosClient.get<TeamApiResponse>("/about/team");
    return mapTeamFromApi(response.data.data);
  },

  async actualizarEquipo(data: Team): Promise<Team> {
    const formData = new FormData();

    formData.append("sectionTitle", data.sectionTitle);
    formData.append("sectionDescription", data.sectionDescription ?? "");

    data.members.forEach((member, index) => {
      formData.append(`members[${index}][id]`, member.id);
      formData.append(`members[${index}][personalId]`, String(member.personalId ?? ""));
      formData.append(`members[${index}][name]`, member.name);
      formData.append(`members[${index}][position]`, member.position);
      formData.append(`members[${index}][description]`, member.description);
      formData.append(`members[${index}][image_alt]`, member.image.alt ?? "");

      if (member.image.file) {
        formData.append(`members[${index}][image]`, member.image.file);
      }
    });

    const response = await axiosClient.post<TeamApiResponse>(
      "/about/team",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return mapTeamFromApi(response.data.data);
  },
};
