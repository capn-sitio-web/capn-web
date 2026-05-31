import { Box, CircularProgress, Typography } from "@mui/material";
import aboutusHero from "../../assets/page-headers/aboutus.jpg";
import historia from "../../assets/historia.jpeg";
import PageHeader from "../components/containers/PageHeader";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";
import FlatIconCard from "../components/cards/FlatIconCard";
import OutlinedImageCard from "../components/cards/OutlinedImageCard";
import { useAboutPage } from "../services/about/useAboutPage";

const AboutUsPage = () => {
  const { data, loading, error } = useAboutPage();
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
          No se pudo cargar la información de Nosotros.
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
          backgroundImage={data.banner.image || aboutusHero}
        />
      )}
      {/* Sección: Nuestra Historia */}
      {data.history && (
        <InfoImageSection
          title={data.history.title}
          description={data.history.description}
          image={data.history.image || historia}
        />
      )}
      {/* Sección: Misión y Visión */}
      {data.missionVision && (
        <GridSection
          title={data.missionVision.title}
          items={data.missionVision.items}
          CardComponent={OutlinedIconCard}
          columns={2}
          backgroundColor="#F9FAFB"
        />
      )}
      {/* Sección: Nuestros Valores */}
      {data.values && (
        <GridSection
          title={data.values.title}
          subtitle={data.values.subtitle}
          items={data.values.items}
          CardComponent={FlatIconCard}
          columns={4}
        />
      )}
      {/* Sección: Nuestro Equipo */}
      {data.team && data.team.items.length > 0 && (
        <GridSection
          title={data.team.title}
          subtitle={data.team.subtitle}
          items={data.team.items}
          CardComponent={OutlinedImageCard}
          columns={3}
          backgroundColor="#F9FAFB"
        />
      )}
    </Box>
  );
}

export default AboutUsPage;