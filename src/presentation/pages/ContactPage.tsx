import { Box, CircularProgress } from "@mui/material";
//import { DirectionsCar, DirectionsWalk, DirectionsBus } from "@mui/icons-material";
import LocationSection from "../components/containers/LocationSection";
import PageHeader from "../components/containers/PageHeader";
import { useContactPage } from "../services/contact/useContactPage";

const ContactPage = () => {
  const { data, loading } = useContactPage();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={8}>
        <CircularProgress />
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
      <PageHeader
        title={data.banner.title}
        subtitle={data.banner.subtitle}
        backgroundImage={data.banner.image}
      />
      {/* Sección: Ubicación */}
      <LocationSection
        title={data.location.title}
        subtitle={data.location.subtitle}
        mapSrc={data.location.mapSrc}
        //infoItems={infoItems}
      />
    </Box>
  );
};

export default ContactPage;
