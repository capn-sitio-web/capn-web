import { Box, CircularProgress } from "@mui/material";
//import { DirectionsCar, DirectionsWalk, DirectionsBus } from "@mui/icons-material";
import contactHero from "../../assets/page-headers/contact.jpg";
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

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1903.696612959249!2d-66.1452607671082!3d-17.392906671602976!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373461dd2a507%3A0xf7dfd911f9012582!2sCentro%20de%20Alimentos%20y%20Productos%20Naturales%2C%20UMSS!5e0!3m2!1ses-419!2sbo!4v1763854558834!5m2!1ses-419!2sbo";
    //https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1084.0581216126302!2d-66.14561821693667!3d-17.39297686976564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e373461dd2a507%3A0xf7dfd911f9012582!2sCentro%20de%20Alimentos%20y%20Productos%20Naturales%2C%20UMSS!5e1!3m2!1ses-419!2sbo!4v1763690418229!5m2!1ses-419!2sbo
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
