import { Box } from "@mui/material";
import historia from "../../assets/historia.jpeg";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import InfoCard from "../components/cards/InfoCard";
import { Security, EmojiEvents, Favorite, Visibility } from "@mui/icons-material";

const valoresData = [
  {
    icon: <Security sx={{ color: "#3B82F6" }} />,
    title: "Responsabilidad",
    description: "Compromiso con la exactitud y confiabilidad en cada análisis realizado.",
  },
  {
    icon: <EmojiEvents sx={{ color: "#22C55E" }} />,
    title: "Excelencia",
    description: "Búsqueda constante de la mejora continua en todos nuestros procesos.",
  },
  {
    icon: <Favorite sx={{ color: "#F97316" }} />,
    title: "Compromiso",
    description: "Dedicación total a la seguridad alimentaria y el bienestar social.",
  },
  {
    icon: <Visibility sx={{ color: "#A855F7" }} />,
    title: "Transparencia",
    description: "Información clara y honesta en todos nuestros procedimientos.",
  },
];

const AboutUsPage = () => {
  return (
    <Box>
      {/* Sección: Nuestra Historia */}
      <InfoImageSection
          title="Nuestra Historia"
          description={`El Centro de Alimentos y Productos Naturales (CAPN) fue fundado en 2008 como una iniciativa de la Facultad de Ciencias y Tecnología de la Universidad Mayor de San Simón (UMSS), con el objetivo de brindar servicios especializados en análisis de alimentos y productos naturales.
                      \nDesde sus inicios, el CAPN se ha posicionado como un referente en Bolivia por su compromiso con la excelencia científica y la innovación tecnológica. En 2015, iniciamos el proceso de acreditación bajo la norma internacional ISO/IEC 17025, convirtiéndonos en 2018 en el primer laboratorio de análisis de alimentos certificado en el país.
                      \nA lo largo de estos años, hemos evolucionado constantemente, incorporando nuevas metodologías, equipos de última generación y ampliando nuestro alcance de servicios para responder a las necesidades del sector alimentario boliviano.`}
          image={historia}
        />
      
      <GridSection
        title="Nuestros Valores"
        subtitle="Los principios que guían nuestro trabajo diario"
        items={valoresData}
        CardComponent={InfoCard}
        //columns={4}
      />
    </Box>
  );
}

export default AboutUsPage;