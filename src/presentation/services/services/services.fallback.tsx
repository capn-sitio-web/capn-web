import {
  LooksOne,
  LooksTwo,
  Looks3,
  Looks4,
  ScienceOutlined,
  BiotechOutlined,
  ScaleOutlined,
  OpacityOutlined,
  AcUnitOutlined,
  ScienceRounded,
} from "@mui/icons-material";

import servicesHero from "../../../assets/page-headers/services2.jpeg";
import analisismicrobiologico from "../../../assets/analisismicrobiologico.jpg";
import analisisfisicoquimico from "../../../assets/analisisfisicoquimico.jpg";
import analisissensorial from "../../../assets/analisissensorial.jpg";
import analisisespecializado from "../../../assets/analisisespecializado.jpg";

import type { ServicesPageData } from "./services.types";

export const servicesFallbackData: ServicesPageData = {
  banner: {
    title: "Nuestros Servicios",
    subtitle:
      "Ofrecemos análisis especializados con tecnología de punta y metodologías certificadas internacionalmente.",
    image: servicesHero,
  },

  microbiologico: {
    title: "Análisis Microbiológicos",
    description:
      "Detección y cuantificación de microorganismos indicadores y patógenos en alimentos, agua y superficies de contacto con alimentos.",
    image: analisismicrobiologico,
    items: [
      "Microorganismos Indicadores",
      "Patógenos",
      "Mohos y Levaduras",
      "Análisis de Agua",
    ],
  },

  fisicoquimico: {
    title: "Análisis Fisicoquímico",
    description:
      "Determinación de componentes nutricionales y parámetros de calidad en alimentos procesados y materias primas.",
    image: analisisfisicoquimico,
    items: [
      "Composición Proximal",
      "Parámetros de Calidad",
      "Vitaminas y Minerales",
      "Perfil Lipídico",
    ],
  },

  sensorial: {
    title: "Análisis Sensorial",
    description:
      "Evaluación de la calidad sensorial de alimentos mediante paneles de catadores entrenados y metodologías estandarizadas.",
    image: analisissensorial,
    items: [
      "Análisis Descriptivo",
      "Pruebas de Preferencia",
      "Pruebas Discriminativa",
      "Vida Útil Sensorial",
    ],
  },

  especializado: {
    title: "Análisis Especializado",
    description:
      "Determinación de contaminantes y compuestos específicos mediante técnicas analíticas avanzadas de cromatografía y espectrometría.",
    image: analisisespecializado,
    items: [
      "Residuos de Plaguicidas",
      "Metales Pesados",
      "Micotoxinas",
      "Compuestos Bioactivos",
    ],
  },

  procesoTrabajo: {
    title: "Nuestro Proceso de Trabajo",
    subtitle: "Metodología rigurosa para garantizar resultados confiables.",
    items: [
      {
        icon: <LooksOne sx={{ color: "#3B82F6" }} />,
        title: "Recepción de Muestra",
        description:
          "Registro detallado y verificación de condiciones de la muestra según protocolos establecidos.",
      },
      {
        icon: <LooksTwo sx={{ color: "#22C55E" }} />,
        title: "Preparación",
        description:
          "Acondicionamiento y preparación de la muestra según metodologías validadas.",
      },
      {
        icon: <Looks3 sx={{ color: "#F97316" }} />,
        title: "Análisis",
        description:
          "Ejecución de ensayos con equipos calibrados y personal especializado.",
      },
      {
        icon: <Looks4 sx={{ color: "#A855F7" }} />,
        title: "Entrega de Resultados",
        description:
          "Informe técnico validado con interpretación de resultados y recomendaciones.",
      },
    ],
  },

  equiposTecnologia: {
    title: "Equipos y Tecnología",
    subtitle: "Instrumentación de última generación para análisis precisos.",
    items: [
      {
        icon: <ScienceOutlined />,
        title: "Cromatógrafo de Gases",
        description:
          "Shimadzu GC-2010 con detectores FID y ECD para análisis de residuos de plaguicidas.",
      },
      {
        icon: <BiotechOutlined />,
        title: "Cromatógrafo Líquido",
        description:
          "HPLC Agilent 1260 para determinación de vitaminas y micotoxinas.",
      },
      {
        icon: <ScienceRounded />,
        title: "Espectrofotómetro",
        description:
          "UV-Vis Thermo Scientific para análisis de composición y contaminantes.",
      },
      {
        icon: <AcUnitOutlined />,
        title: "Liofilizador",
        description:
          "Labconco para preparación de muestras y conservación de estándares.",
      },
      {
        icon: <OpacityOutlined />,
        title: "Digestor por Microondas",
        description:
          "CEM Mars 6 para digestión de muestras en análisis de metales pesados.",
      },
      {
        icon: <ScaleOutlined />,
        title: "Balanza Analítica",
        description:
          "Mettler Toledo con precisión de 0.1 mg para preparación exacta de muestras.",
      },
    ],
  },

  cta: {
    title: "¿Necesitas un análisis específico?",
    subtitle:
      "Contáctanos para una consulta personalizada y cotización detallada de nuestros servicios.",
    primaryButton: { label: "Solicitar Cotización" },
    secondaryButton: { label: "Ver Todos los Servicios" },
  },
};
