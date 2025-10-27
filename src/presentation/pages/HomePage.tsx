import { Box, Container, Grid } from "@mui/material";
import { Science, Restaurant, ColorLens, LocalHospital } from "@mui/icons-material";
import hero from "../../assets/hero-lab.jpeg";
import calidad from "../../assets/calidad-certificada.jpeg";
import HeroSection from "../components/containers/HeroSection";
import SectionTitle from "../components/containers/SectionTitle";
import IconInfoCard from "../components/cards/IconInfoCard";
import InfoImageSection from "../components/containers/InfoImageSection";
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

const HomePage = () => {
  return (
    <Box>
      {/* Hero */}
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
      {/* Servicios */}
      <Box bgcolor={"#F9FAFB"} sx={{ pt: 8, pb: 12 }}>
        <Container>
          <SectionTitle
            title="Nuestros Servicios"
            subtitle="Ofrecemos análisis especializados con tecnología de punta y personal altamente calificado."
          />
          <Grid container spacing={6} justifyContent="center">
            {servicesData.map((item, index) => (
              <Grid item key={index}>
                <IconInfoCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Calidad Certificada */}
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
      {/* Análisis de alimentos */}
      <CallToActionSection
        title="¿Necesitas análisis de alimentos?"
        subtitle="Contáctanos hoy mismo y obtén resultados confiables respaldados por nuestra certificación internacional"
        background="gradient"
        primaryButton={{ label: "Solicitar Cotización" }}
        secondaryButton={{ label: "Ver Todos los Servicios" }}
      />
    </Box>
  );
}

export default HomePage;