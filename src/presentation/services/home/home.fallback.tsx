import hero from "../../../assets/hero-lab.jpeg";
import calidad from "../../../assets/calidad-certificada.jpg";
import cofadenaLogo from "../../../assets/clients-logo/cofadena.png";
import inlasaLogo from "../../../assets/clients-logo/inlasa.png";
import pilLogo from "../../../assets/clients-logo/pil.svg";
import senasagLogo from "../../../assets/clients-logo/senasag.png";
import umssLogo from "../../../assets/clients-logo/umss.svg";
import oberonLogo from "../../../assets/clients-logo/oberon.png";
import fcapfLogo from "../../../assets/clients-logo/fcapf.png";

import { Science, Restaurant, ColorLens, LocalHospital } from "@mui/icons-material";

export const homeFallbackData = {
  banner: {
    title: "Centro de Alimentos y Productos Naturales",
    subtitle:
      "Laboratorio especializado en análisis microbiológicos, fisicoquímicos y sensoriales. Certificado ISO/IEC 17025 para garantizar la calidad y seguridad alimentaria.",
    image: hero,
  },

  services: {
    title: "Nuestros Servicios",
    subtitle:
      "Ofrecemos análisis especializados con tecnología de punta y personal altamente calificado.",
    items: [
      {
        icon: <Science />,
        title: "Análisis Microbiológicos",
        description:
          "Detección de microorganismos indicadores y patógenos en alimentos y agua.",
      },
      {
        icon: <Restaurant />,
        title: "Análisis Fisicoquímicos",
        description:
          "Determinación de nutrientes y parámetros de calidad en alimentos.",
      },
      {
        icon: <ColorLens />,
        title: "Análisis Sensoriales",
        description:
          "Evaluaciones con paneles de catadores entrenados para garantizar calidad.",
      },
      {
        icon: <LocalHospital />,
        title: "Análisis Especializados",
        description:
          "Residuos de plaguicidas, metales pesados, micotoxinas y más.",
      },
    ],
  },

  quality: {
    title: "Calidad Certificada",
    description:
      "Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025 para análisis de alimentos, garantizando resultados confiables y reconocidos internacionalmente.",
    image: calidad,
    items: [
      "Certificación ISO/IEC 17025",
      "Personal técnico especializado",
      "Equipos de última generación",
      "Resultados internacionalmente válidos",
    ],
  },

  stats: [
    { value: 15, suffix: "+", label: "Años de Experiencia" },
    { value: 500, suffix: "+", label: "Análisis Realizados" },
    { value: 200, suffix: "+", label: "Empresas Atendidas" },
    { value: 98, suffix: "%", label: "Satisfacción del Cliente" },
  ],

  clients: [
    { name: "COFADENA", logo: cofadenaLogo },
    { name: "INLASA", logo: inlasaLogo },
    { name: "PIL", logo: pilLogo },
    { name: "SENASAG", logo: senasagLogo },
    { name: "UMSS", logo: umssLogo },
    { name: "OBERON", logo: oberonLogo },
    { name: "FCAPF", logo: fcapfLogo },
  ],

  cta: {
    title: "¿Necesitas análisis de alimentos?",
    subtitle:
      "Contáctanos hoy mismo y obtén resultados confiables respaldados por nuestra certificación internacional",
    primaryButton: { label: "Solicitar Cotización" },
    secondaryButton: { label: "Ver Todos los Servicios" },
  },
};
