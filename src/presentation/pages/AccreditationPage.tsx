import { Box, CircularProgress } from "@mui/material"
import PageHeader from "../components/containers/PageHeader";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import { useAccreditationPage } from "../services/accreditation/useAccreditationPage";

const AccreditationPage = () => {
  const { data, loading } = useAccreditationPage();
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
      {/* Sección: Nuestro Sistema de Calidad */}
      <GridSection
        title={data.sistemaCalidad.title}
        subtitle={data.sistemaCalidad.subtitle}
        items={data.sistemaCalidad.items}
        CardComponent={FlatIconCard}
        columns={4}
      />
      {/* Sección: Resultados certificados */}
      <CallToActionSection
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        primaryButton={data.cta.primaryButton}
        secondaryButton={data.cta.secondaryButton}
      />
    </Box>
  );
}

export default AccreditationPage;