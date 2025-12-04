import { Box } from "@mui/material"
import accreditationHero from "../../assets/page-headers/accreditation.jpg";
import PageHeader from "../components/containers/PageHeader";

const AccreditationPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Acreditación y Calidad"
        subtitle="Somos el primer laboratorio en Bolivia certificado bajo la norma ISO/IEC 17025, garantizando resultados confiables y reconocidos internacionalmente"
        backgroundImage={accreditationHero}
      />
    </Box>
  );
}

export default AccreditationPage;