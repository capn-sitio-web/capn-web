import { Box } from "@mui/material"
import accreditationHero from "../../assets/page-headers/accreditation.jpg";
import PageHeader from "../components/containers/PageHeader";
import CallToActionSection from "../components/containers/CallToActionSection";

const AccreditationPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Acreditación y Calidad"
        subtitle="Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025, garantizando resultados confiables y reconocidos internacionalmente"
        backgroundImage={accreditationHero}
      />
      {/* Sección: Resultados certificados */}
      <CallToActionSection
        title="¿Necesitas resultados certificados?"
        subtitle="Solicita nuestros servicios acreditados y obtén resultados con validez internacional"
        primaryButton={{ label: "Solicitar Análisis" }}
        secondaryButton={{ label: "Conocer Nuestro Equipo" }}
      />
    </Box>
  );
}

export default AccreditationPage;