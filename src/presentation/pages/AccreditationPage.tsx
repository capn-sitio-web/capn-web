import { Box } from "@mui/material"
import { Description, Search, Settings, VerifiedUser } from "@mui/icons-material";
import accreditationHero from "../../assets/page-headers/accreditation.jpg";
import PageHeader from "../components/containers/PageHeader";
import GridSection from "../components/containers/GridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import FlatIconCard from "../components/cards/FlatIconCard";

const sistemaCalidadData = [
  {
    icon: <Description sx={{ color: "#3B82F6" }} />,
    title: "1. Recepción",
    description: "Registro detallado de muestras con trazabilidad completa",
  },
  {
    icon: <Settings sx={{ color: "#22C55E" }} />,
    title: "2. Preparación",
    description: "Acondicionamiento según protocolos estandarizados",
  },
  {
    icon: <Search sx={{ color: "#F97316" }} />,
    title: "3. Análisis",
    description: "Ensayos con métodos validados y equipos calibrados",
  },
  {
    icon: <VerifiedUser sx={{ color: "#A855F7" }} />,
    title: "4. Validación",
    description: "Revisión técnica y emisión de informes certificados",
  },
];

const AccreditationPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Acreditación y Calidad"
        subtitle="Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025, garantizando resultados confiables y reconocidos internacionalmente"
        backgroundImage={accreditationHero}
      />
      {/* Sección: Nuestros Valores */}
      <GridSection
        title="Nuestro Sistema de Calidad"
        subtitle="Garantizamos la confiabilidad en cada etapa del proceso"
        items={sistemaCalidadData}
        CardComponent={FlatIconCard}
        columns={4}
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