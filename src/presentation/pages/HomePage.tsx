import { Box, CircularProgress, Typography } from "@mui/material";
import hero from "../../assets/hero-lab.jpeg";
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
import { useHomePage } from "../services/home/useHomePage";

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
  const { data, loading, error } = useHomePage();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {/* Sección: Hero */}
      {data.banner && (
        <HeroSection
          title={data.banner.title}
          subtitle={data.banner.subtitle}
          image={data.banner.image}
          buttons={[
            { label: "Nuestros Servicios", color: "primary" },
            { label: "Solicitar Análisis", color: "success" },
            { label: "Ver Acreditación", color: "secondary" },
          ]}
        />
      )}
      {/* Sección: Nuestros Servicios */}
      {data.services && (
        <GridSection
          title={data.services.title}
          subtitle={data.services.subtitle}
          items={data.services.items}
          CardComponent={OutlinedIconCard}
          backgroundColor="#F9FAFB"
        />
      )}
      {/* Sección: Calidad Certificada */}
      {data.quality && (
        <InfoImageSection
          title={data.quality.title}
          description={data.quality.description}
          image={data.quality.image}
          items={data.quality.items}
          buttonText="Ver Certificación"
          buttonColor="primary"
        />
      )}
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