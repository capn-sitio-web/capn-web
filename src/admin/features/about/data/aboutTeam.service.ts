import type { Team } from "../domain/about.types";

const mockTeam: Team = {
  seccionId: null,
  sectionTitle: "Nuestro Equipo",
  sectionDescription: "Profesionales especializados comprometidos con la excelencia",
  members: [
    {
      id: "1",
      image: {
        file: null,
        previewUrl:
          "https://img.freepik.com/vector-gratis/cientifico-dibujos-animados-laboratorio_23-2148672514.jpg",
        imageId: null,
        alt: "Integrante del equipo CAPN",
      },
      name: "Ing. Carlos Mendoza",
      position: "Director General",
      description:
        "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
    },
    {
      id: "2",
      image: {
        file: null,
        previewUrl:
          "https://img.freepik.com/vector-gratis/cientifico-dibujos-animados-laboratorio_23-2148672514.jpg",
        imageId: null,
        alt: "Integrante del equipo CAPN",
      },
      name: "Lic. Ana Rodríguez",
      position: "Responsable de Laboratorio",
      description:
        "Especialista en análisis microbiológicos y control de calidad alimentaria.",
    },
  ],
};

export const aboutTeamService = {
  async obtenerEquipo(): Promise<Team> {
    return mockTeam;
  },

  async actualizarEquipo(data: Team): Promise<Team> {
    return data;
  },
};
