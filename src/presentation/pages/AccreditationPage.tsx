import { Box, CircularProgress, Typography } from "@mui/material"
import accreditationHero from "../../assets/page-headers/accreditation.jpg";
import PageHeader from "../components/containers/PageHeader";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import { useAccreditationPage } from "../services/accreditation/useAccreditationPage";

const ctaData = {
  title: "¿Necesitas resultados certificados?",
  subtitle:
    "Solicita nuestros servicios acreditados y obtén resultados con validez internacional.",
  primaryButton: { label: "Solicitar Análisis" },
  secondaryButton: { label: "Conocer Nuestro Equipo" },
};

const AccreditationPage = () => {
  const { data, loading, error } = useAccreditationPage();
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
          No se pudo cargar la información de acreditación.
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
          backgroundImage={data.banner.image || accreditationHero}
        />
      )}
      {/* Sección: Nuestro Sistema de Calidad */}
      {data.sistemaCalidad && (
        <GridSection
          title={data.sistemaCalidad.title}
          subtitle={data.sistemaCalidad.subtitle}
          items={data.sistemaCalidad.items}
          CardComponent={FlatIconCard}
          columns={4}
        />
      )}
      {/* Sección: Resultados certificados */}
      <CallToActionSection
        title={ctaData.title}
        subtitle={ctaData.subtitle}
        primaryButton={ctaData.primaryButton}
        secondaryButton={ctaData.secondaryButton}
      />
    </Box>
  );
}

export default AccreditationPage;