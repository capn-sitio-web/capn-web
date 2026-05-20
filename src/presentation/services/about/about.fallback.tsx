import {
  Shield,
  Visibility,
  Favorite,
  EmojiEvents,
} from "@mui/icons-material";
import aboutusHero from "../../../assets/page-headers/aboutus.jpg";
import historia from "../../../assets/historia.jpeg";
import carlos from "../../../assets/carlos.jpg";
import type { AboutPageData } from "./about.types";

export const aboutFallbackData: AboutPageData = {
  banner: {
    title: "Nosotros",
    subtitle:
      "Conoce la historia, misión y el equipo que hace del CAPN el laboratorio de referencia en análisis de alimentos en Bolivia.",
    image: aboutusHero,
  },

  history: {
    title: "Nuestra Historia",
    description:
      "El Centro de Alimentos y Productos Naturales (CAPN) fue fundado como una iniciativa de la Universidad Mayor de San Simón, con el objetivo de brindar servicios especializados en análisis de alimentos y productos naturales.",
    image: historia,
  },

  missionVision: {
    title: "Misión y Visión",
    subtitle: undefined,
    items: [
      {
        icon: <Shield />,
        title: "Nuestra Misión",
        description:
          "Brindar servicios de análisis fisicoquímicos, microbiológicos y sensoriales de alimentos y productos naturales con altos estándares de calidad.",
        txtAlign: "left",
      },
      {
        icon: <Visibility />,
        title: "Nuestra Visión",
        description:
          "Ser un laboratorio de referencia a nivel nacional en análisis de alimentos y productos naturales, reconocido por su calidad técnica y compromiso científico.",
        txtAlign: "left",
      },
    ],
  },

  values: {
    title: "Nuestros Valores",
    subtitle: "Los principios que guían nuestro trabajo diario.",
    items: [
      {
        icon: <Visibility />,
        title: "Transparencia",
        description:
          "Información clara y honesta en todos nuestros procedimientos.",
      },
      {
        icon: <Favorite />,
        title: "Compromiso",
        description:
          "Responsabilidad y dedicación en cada servicio brindado.",
      },
      {
        icon: <EmojiEvents />,
        title: "Excelencia",
        description:
          "Búsqueda constante de calidad en nuestros procesos y resultados.",
      },
    ],
  },

  team: {
    title: "Nuestro Equipo",
    subtitle: "Profesionales especializados comprometidos con la excelencia.",
    items: [
      {
        image: carlos,
        title: "Ing. Carlos Mendoza",
        subtitle: "Director General",
        description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
      },
      {
        image: carlos,
        title: "Ing. Carlos Mendoza",
        subtitle: "Director General",
        description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
      },
      {
        image: carlos,
        title: "Ing. Carlos Mendoza",
        subtitle: "Director General",
        description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
      },
      {
        image: carlos,
        title: "Ing. Carlos Mendoza",
        subtitle: "Director General",
        description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
      },
    ],
  },
};
