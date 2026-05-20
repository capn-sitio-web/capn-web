import { Box, CircularProgress } from "@mui/material";
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
  const { data, loading } = useHomePage();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      {/* Sección: Hero */}
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
      {/* Sección: Nuestros Servicios */}
      <GridSection
        title={data.services.title}
        subtitle={data.services.subtitle}
        items={data.services.items}
        CardComponent={OutlinedIconCard}
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Calidad Certificada */}
      <InfoImageSection
        title={data.quality.title}
        description={data.quality.description}
        image={data.quality.image}
        items={data.quality.items}
        buttonText="Ver Certificación"
        buttonColor="primary"
      />
      {/* Sección: Nuestros asdfg */}
      <StatsSection
        stats={data.stats}
        backgroundImage={data.banner.image}
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
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        primaryButton={data.cta.primaryButton}
        secondaryButton={data.cta.secondaryButton}
      />
    </Box>
  );
}

export default HomePage;