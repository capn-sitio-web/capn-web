import { Box } from "@mui/material";
import { Science, Restaurant, ColorLens, LocalHospital } from "@mui/icons-material";
import hero from "../../assets/hero-lab.jpeg";
import calidad from "../../assets/calidad-certificada.jpg";
import cofadenaLogo from "../../assets/clients-logo/cofadena.png";
import inlasaLogo from "../../assets/clients-logo/inlasa.png";
import pilLogo from "../../assets/clients-logo/pil.svg";
import senasagLogo from "../../assets/clients-logo/senasag.png";
import umssLogo from "../../assets/clients-logo/umss.svg";
import oberonLogo from "../../assets/clients-logo/oberon.png";
import fcapfLogo from "../../assets/clients-logo/fcapf.png";
import HeroSection from "../components/containers/HeroSection";
import GridSection from "../components/containers/GridSection";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";
import InfoImageSection from "../components/containers/InfoImageSection";
import ClientsSection from "../components/sections/ClientsSection";
import StatsSection from "../components/sections/StatsSection";
import CallToActionSection from "../components/containers/CallToActionSection";

const servicesData = [
  {
    icon: <Science />,
    title: "Análisis Microbiológicos",
    description: "Detección de microorganismos indicadores y patógenos en alimentos y agua.",
  },
  {
    icon: <Restaurant />,
    title: "Análisis Fisicoquímicos",
    description: "Determinación de nutrientes y parámetros de calidad en alimentos.",
  },
  {
    icon: <ColorLens />,
    title: "Análisis Sensoriales",
    description: "Evaluaciones con paneles de catadores entrenados para garantizar calidad.",
  },
  {
    icon: <LocalHospital />,
    title: "Análisis Especializados",
    description: "Residuos de plaguicidas, metales pesados, micotoxinas y más.",
  },
];

const statsData = [
  { value: 15, suffix: "+", label: "Años de Experiencia" },
  { value: 500, suffix: "+", label: "Análisis Realizados" },
  { value: 200, suffix: "+", label: "Empresas Atendidas" },
  { value: 98, suffix: "%", label: "Satisfacción del Cliente" },
];

const clientsData = [
  { name: "COFADENA", logo: cofadenaLogo },
  { name: "INLASA", logo: inlasaLogo },
  { name: "PIL", logo: pilLogo },
  { name: "SENASAG", logo: senasagLogo },
  { name: "UMSS", logo: umssLogo },
  { name: "OBERON", logo: oberonLogo },
  { name: "FCAPF", logo: fcapfLogo },
];

const HomePage = () => {
  return (
    <Box>
      {/* Sección: Hero */}
      <HeroSection
        title="Centro de Alimentos y Productos Naturales"
        subtitle="Laboratorio especializado en análisis microbiológicos, fisicoquímicos y sensoriales. Certificado ISO/IEC 17025 para garantizar la calidad y seguridad alimentaria."
        image={hero}
        buttons={[
          { label: "Nuestros Servicios", color: "primary" },
          { label: "Solicitar Análisis", color: "success" },
          { label: "Ver Acreditación", color: "secondary" },
        ]}
      />
      {/* Sección: Nuestros Servicios */}
      <GridSection
        title="Nuestros Servicios"
        subtitle="Ofrecemos análisis especializados con tecnología de punta y personal altamente calificado."
        items={servicesData}
        CardComponent={OutlinedIconCard}
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Calidad Certificada */}
      <InfoImageSection
        title="Calidad Certificada"
        description="Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025 para análisis de alimentos, garantizando resultados confiables y reconocidos internacionalmente."
        image={calidad}
        items={[
          "Certificación ISO/IEC 17025",
          "Personal técnico especializado",
          "Equipos de última generación",
          "Resultados internacionalmente válidos",
        ]}
        buttonText="Ver Certificación"
        buttonColor="primary"
      />
      {/* Sección: Nuestros asdfg */}
      <StatsSection
        stats={statsData}
        backgroundImage={hero}
        duration={2000}
      />
      {/* Sección: Nuestros Clientes */}
      <ClientsSection
        title="Nuestros Clientes"
        subtitle="Empresas e instituciones que confían en nosotros"
        clients={clientsData}
      />
      {/* Sección: Análisis de alimentos */}
      <CallToActionSection
        title="¿Necesitas análisis de alimentos?"
        subtitle="Contáctanos hoy mismo y obtén resultados confiables respaldados por nuestra certificación internacional"
        primaryButton={{ label: "Solicitar Cotización" }}
        secondaryButton={{ label: "Ver Todos los Servicios" }}
      />
    </Box>
  );
}

export default HomePage;