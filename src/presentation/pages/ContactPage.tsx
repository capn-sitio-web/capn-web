import { Box, Typography } from "@mui/material";
import CardPageSkeleton from "../components/skeletons/CardPageSkeleton";
import contactHero from "../../assets/page-headers/contact.jpg";
//import { DirectionsCar, DirectionsWalk, DirectionsBus } from "@mui/icons-material";
import LocationSection from "../components/containers/LocationSection";
import PageHeader from "../components/containers/PageHeader";
import { useContactPage } from "../services/contact/useContactPage";

const ContactPage = () => {
  const { data, loading, error } = useContactPage();
  if (loading) {
    return <CardPageSkeleton />;
  }
  if (error || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">
          No se pudo cargar la información de contacto.
        </Typography>
      </Box>
    );
  }

  /*const infoItems = [
    {
      icon: <DirectionsCar sx={{ color: "#3B82F6" }} />,
      title: "En Vehículo",
      description: "Estacionamiento disponible en el campus universitario.",
    },
    {
      icon: <DirectionsBus sx={{ color: "#22C55E" }} />,
      title: "Transporte Público",
      description: "Líneas 1, 15, 21 y minibuses hacia la UMSS.",
    },
    {
      icon: <DirectionsWalk sx={{ color: "#F97316" }} />,
      title: "Acceso Peatonal",
      description: "Ingreso por la puerta principal de FCyT.",
    },
  ];*/

  return (
    <Box>
      {/* Sección: Cabecera */}
      {data.banner && (
        <PageHeader
          title={data.banner.title}
          subtitle={data.banner.subtitle}
          backgroundImage={data.banner.image || contactHero}
        />
      )}
      {/* Sección: Ubicación */}
      {data.location && (
        <LocationSection
          title={data.location.title}
          subtitle={data.location.subtitle}
          mapSrc={data.location.mapSrc}
          //infoItems={infoItems}
        />
      )}
    </Box>
  );
};

export default ContactPage;
