import { Box, CircularProgress, Typography } from "@mui/material"
import PageHeader from "../components/containers/PageHeader";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";
import { useServicesPage } from "../services/services/useServicesPage";

const ctaData = {
  title: "¿Necesitas un análisis específico?",
  subtitle:
    "Contáctanos para una consulta personalizada y cotización detallada de nuestros servicios.",
  primaryButton: { label: "Solicitar Cotización" },
  secondaryButton: { label: "Ver Todos los Servicios" },
};

const ServicesPage = () => {
  const { data, loading, error } = useServicesPage();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
      </Box>
    );
  }
  if (error || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">
          No se pudo cargar la información de servicios.
        </Typography>
      </Box>
    );
  }
  return (
    <Box>
      {/* Sección: Cabecera */}
      {data.banner && (
        <PageHeader
          title={data.banner.title}
          subtitle={data.banner.subtitle}
          backgroundImage={data.banner.image}
        />
      )}
      {/* Sección: Análisis Microbiológicos */}
      {data.microbiologico && (
        <InfoImageSection
          title={data.microbiologico.title}
          description={data.microbiologico.description}
          image={data.microbiologico.image}
          items={data.microbiologico.items}
          buttonText="Solicitar Información"
          buttonColor="primary"
        />
      )}
      {/* Sección: Análisis Fisicoquímico */}
      {data.fisicoquimico && (
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
      )}
      {/* Sección: Análisis Sensorial */}
      {data.sensorial && (
        <InfoImageSection
          title={data.sensorial.title}
          description={data.sensorial.description}
          image={data.sensorial.image}
          items={data.sensorial.items}
          buttonText="Solicitar Información"
          buttonColor="primary"
        />
      )}
      {/* Sección: Análisis Especializado */}
      {data.especializado && (
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
      )}
      {/* Sección: Nuestro Proceso de Trabajo */}
      {data.procesoTrabajo && (
        <GridSection
          title={data.procesoTrabajo.title}
          subtitle={data.procesoTrabajo.subtitle}
          items={data.procesoTrabajo.items}
          CardComponent={FlatIconCard}
        />
      )}
      {/* Sección: Equipos y Tecnología */}
      {data.equiposTecnologia && (
        <GridSection
          title={data.equiposTecnologia.title}
          subtitle={data.equiposTecnologia.subtitle}
          items={data.equiposTecnologia.items}
          CardComponent={OutlinedIconCard}
          backgroundColor="#F9FAFB"
          columns={3}
        />
      )}
      {/* Sección: Análisis específico */}
      <CallToActionSection
        title={ctaData.title}
        subtitle={ctaData.subtitle}
        primaryButton={ctaData.primaryButton}
        secondaryButton={ctaData.secondaryButton}
        background="white"
      />
    </Box>
  );
}

export default ServicesPage;