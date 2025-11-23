import { Box } from "@mui/material"
import { LooksOne, LooksTwo, Looks3, Looks4, ScienceOutlined, BiotechOutlined, ScaleOutlined, OpacityOutlined, AcUnitOutlined, ScienceRounded } from "@mui/icons-material";
import analisis from "../../assets/analisis.jpeg";
import analisismicrobiologico from "../../assets/analisismicrobiologico.jpg";
import analisisfisicoquimico from "../../assets/analisisfisicoquimico.jpg";
import analisissensorial from "../../assets/analisissensorial.jpg";
import analisisespecializado from "../../assets/analisisespecializado.jpg";
import PageHeader from "../components/containers/PageHeader";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";

const procesoTrabajoData = [
  {
    icon: <LooksOne sx={{ color: "#3B82F6" }} />,
    title: "Recepción de Muestra",
    description: "Registro detallado y verificación de condiciones de la muestra según protocolos establecidos",
  },
  {
    icon: <LooksTwo sx={{ color: "#22C55E" }} />,
    title: "Preparación",
    description: "Acondicionamiento y preparación de la muestra según metodologías validadas",
  },
  {
    icon: <Looks3 sx={{ color: "#F97316" }} />,
    title: "Análisis",
    description: "Ejecución de ensayos con equipos calibrados y personal especializado",
  },
  {
    icon: <Looks4 sx={{ color: "#A855F7" }} />,
    title: "Entrega de Resultados",
    description: "Informe técnico validado con interpretación de resultados y recomendaciones",
  },
];

const equiposTecnologiaData = [
  {
    icon: <ScienceOutlined />,
    title: "Cromatógrafo de Gases",
    description: "Shimadzu GC-2010 con detectores FID y ECD para análisis de residuos de plaguicidas",
  },
  {
    icon: <BiotechOutlined />,
    title: "Cromatógrafo Líquido",
    description: "HPLC Agilent 1260 para determinación de vitaminas y micotoxinas",
  },
  {
    icon: <ScienceRounded />,
    title: "Espectrofotómetro",
    description: "UV-Vis Thermo Scientific para análisis de composición y contaminantes",
  },
  {
    icon: <AcUnitOutlined />,
    title: "Liofilizador",
    description: "Labconco para preparación de muestras y conservación de estándares",
  },
  {
    icon: <OpacityOutlined />,
    title: "Digestor por Microondas",
    description: "CEM Mars 6 para digestión de muestras en análisis de metales pesados",
  },
  {
    icon: <ScaleOutlined />,
    title: "Balanza Analítica",
    description: "Mettler Toledo con precisión de 0.1 mg para preparación exacta de muestras",
  },
];

const ServicesPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Nuestros Servicios"
        subtitle="Ofrecemos análisis especializados con tecnología de punta y metodologías certificadas internacionalmente"
        backgroundImage={analisis}
      />
      {/* Sección: Análisis Microbiológicos */}
      <InfoImageSection
        title="Análisis Microbiológicos"
        description="Detección y cuantificación de microorganismos indicadores y patógenos en alimentos, agua y superficies de contacto con alimentos."
        image={analisismicrobiologico}
        items={[
          "Microorganismos Indicadores",
          "Patógenos",
          "Mohos y Levaduras",
          "Análisis de Agua",
        ]}
        buttonText="Solicitar Información"
        buttonColor="primary"
      />
      {/* Sección: Análisis Fisicoquímico */}
      <InfoImageSection
        title="Análisis Fisicoquímico"
        description="Determinación de componentes nutricionales y parámetros de calidad en alimentos procesados y materias primas."
        image={analisisfisicoquimico}
        items={[
          "Composición Proximal",
          "Parámetros de Calidad",
          "Vitaminas y Minerales",
          "Perfil Lipídico",
        ]}
        buttonText="Solicitar Información"
        buttonColor="success"
        reverse
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Análisis Sensorial */}
      <InfoImageSection
        title="Análisis Sensorial"
        description="Evaluación de la calidad sensorial de alimentos mediante paneles de catadores entrenados y metodologías estandarizadas."
        image={analisissensorial}
        items={[
          "Análisis Descriptivo",
          "Pruebas de Preferencia",
          "Pruebas Discriminativa",
          "Vida Útil Sensorial",
        ]}
        buttonText="Solicitar Información"
        buttonColor="primary"
      />
      {/* Sección: Análisis Especializado */}
      <InfoImageSection
        title="Análisis Especializado"
        description="Determinación de contaminantes y compuestos específicos mediante técnicas analíticas avanzadas de cromatografía y espectrometría."
        image={analisisespecializado}
        items={[
          "Residuos de Plaguicidas",
          "Metales Pesados",
          "Micotoxinas",
          "Compuestos Bioactivos",
        ]}
        buttonText="Solicitar Información"
        buttonColor="success"
        reverse
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Nuestro Proceso de Trabajo */}
      <GridSection
        title="Nuestro Proceso de Trabajo"
        subtitle="Metodología rigurosa para garantizar resultados confiables"
        items={procesoTrabajoData}
        CardComponent={FlatIconCard}
      />
      {/* Sección: Equipos y Tecnología */}
      <GridSection
        title="Equipos y Tecnología"
        subtitle="Instrumentación de última generación para análisis precisos"
        items={equiposTecnologiaData}
        CardComponent={OutlinedIconCard}
        backgroundColor="#F9FAFB"
        columns={3}
      />
      {/* Sección: Análisis específico */}
      <CallToActionSection
        title="¿Necesitas un análisis específico?"
        subtitle="Contáctanos para una consulta personalizada y cotización detallada de nuestros servicios"
        primaryButton={{ label: "Solicitar Cotización" }}
        secondaryButton={{ label: "Ver Todos los Servicios" }}
        background="white"
      />
    </Box>
  );
}

export default ServicesPage;