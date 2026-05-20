import { Box, CircularProgress } from "@mui/material"
import PageHeader from "../components/containers/PageHeader";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";
import { useServicesPage } from "../services/services/useServicesPage";

const ServicesPage = () => {
  const { data, loading } = useServicesPage();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title={data.banner.title}
        subtitle={data.banner.subtitle}
        backgroundImage={data.banner.image}
      />
      {/* Sección: Análisis Microbiológicos */}
      <InfoImageSection
        title={data.microbiologico.title}
        description={data.microbiologico.description}
        image={data.microbiologico.image}
        items={data.microbiologico.items}
        buttonText="Solicitar Información"
        buttonColor="primary"
      />
      {/* Sección: Análisis Fisicoquímico */}
      <InfoImageSection
        title={data.fisicoquimico.title}
        description={data.fisicoquimico.description}
        image={data.fisicoquimico.image}
        items={data.fisicoquimico.items}
        buttonText="Solicitar Información"
        buttonColor="success"
        reverse
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Análisis Sensorial */}
      <InfoImageSection
        title={data.sensorial.title}
        description={data.sensorial.description}
        image={data.sensorial.image}
        items={data.sensorial.items}
        buttonText="Solicitar Información"
        buttonColor="primary"
      />
      {/* Sección: Análisis Especializado */}
      <InfoImageSection
        title={data.especializado.title}
        description={data.especializado.description}
        image={data.especializado.image}
        items={data.especializado.items}
        buttonText="Solicitar Información"
        buttonColor="success"
        reverse
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Nuestro Proceso de Trabajo */}
      <GridSection
        title={data.procesoTrabajo.title}
        subtitle={data.procesoTrabajo.subtitle}
        items={data.procesoTrabajo.items}
        CardComponent={FlatIconCard}
      />
      {/* Sección: Equipos y Tecnología */}
      <GridSection
        title={data.equiposTecnologia.title}
        subtitle={data.equiposTecnologia.subtitle}
        items={data.equiposTecnologia.items}
        CardComponent={OutlinedIconCard}
        backgroundColor="#F9FAFB"
        columns={3}
      />
      {/* Sección: Análisis específico */}
      <CallToActionSection
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        primaryButton={data.cta.primaryButton}
        secondaryButton={data.cta.secondaryButton}
        background="white"
      />
    </Box>
  );
}

export default ServicesPage;