import { Box, Typography } from "@mui/material"
import CardPageSkeleton from "../components/skeletons/CardPageSkeleton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import accreditationHero from "../../assets/page-headers/accreditation.jpg";
import PageHeader from "../components/containers/PageHeader";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";
import { useAccreditationPage } from "../services/accreditation/useAccreditationPage";

const AccreditationPage = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useAccreditationPage();
  if (loading) {
    return <CardPageSkeleton />;
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
        title="¿Necesitas resultados certificados?"
        subtitle="Solicita nuestros servicios acreditados y obtén resultados con validez internacional."
        primaryButton={{ label: "Solicitar Análisis", onClick: () => navigate(ROUTES.CONTACT) }}
        secondaryButton={{ label: "Conocer Nuestro Equipo", onClick: () => navigate(ROUTES.ABOUT) }}
      />
    </Box>
  );
}

export default AccreditationPage;