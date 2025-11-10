import { Box } from "@mui/material";
import { Security, EmojiEvents, Favorite, Visibility } from "@mui/icons-material";
import historia from "../../assets/historia.jpeg";
import carlos from "../../assets/carlos.jpg";
import PageHeader from "../components/containers/PageHeader";
import InfoImageSection from "../components/containers/InfoImageSection";
import GridSection from "../components/containers/GridSection";
import OutlinedIconCard from "../components/cards/OutlinedIconCard";
import FlatIconCard from "../components/cards/FlatIconCard";
import OutlinedImageCard from "../components/cards/OutlinedImageCard";

const misionVisionData = [
  {
    icon: <Security sx={{ color: "#3B82F6" }} />,
    title: "Nuestra Misión",
    description: "Brindar servicios de análisis fisicoquímicos, microbiológicos y sensoriales de alimentos y productos naturales con los más altos estándares de calidad, contribuyendo a la seguridad alimentaria y el desarrollo del sector productivo boliviano mediante la investigación, difusión científica y formación de profesionales especializados.",
    txtAlign: "left",
  },
  {
    icon: <Visibility sx={{ color: "#22C55E" }} />,
    title: "Nuestra Visión",
    description: "Ser el laboratorio de referencia a nivel nacional e internacional en análisis de alimentos y productos naturales, reconocido por su excelencia técnica, credibilidad científica y contribución al desarrollo sostenible del sector alimentario, posicionando a Bolivia como referente en seguridad alimentaria en la región.",
    txtAlign: "left",
  },
];

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

const teamData = [
  {
    image: carlos,
    title: "Ing. Carlos Mendoza",
    subtitle: "Director General",
    description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
  },
  {
    image: carlos,
    title: "Ing. Carlos Mendoza",
    subtitle: "Director General",
    description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
  },
  {
    image: carlos,
    title: "Ing. Carlos Mendoza",
    subtitle: "Director General",
    description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
  },
  {
    image: carlos,
    title: "Ing. Carlos Mendoza",
    subtitle: "Director General",
    description: "Ingeniero Químico con especialización en cromatografía. 15 años de experiencia en determinación de nutrientes y contaminantes en alimentos.",
  },
];

const AboutUsPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Nosotros"
        subtitle="Conoce la historia, misión y el equipo que hace del CAPN el laboratorio de referencia en análisis de alimentos en Bolivia"
        backgroundImage={historia}
        
      />
      {/* Sección: Nuestra Historia */}
      <InfoImageSection
        title="Nuestra Historia"
        description={`El Centro de Alimentos y Productos Naturales (CAPN) fue fundado en 2008 como una iniciativa de la Facultad de Ciencias y Tecnología de la Universidad Mayor de San Simón (UMSS), con el objetivo de brindar servicios especializados en análisis de alimentos y productos naturales.
                    \nDesde sus inicios, el CAPN se ha posicionado como un referente en Bolivia por su compromiso con la excelencia científica y la innovación tecnológica. En 2015, iniciamos el proceso de acreditación bajo la norma internacional ISO/IEC 17025, convirtiéndonos en 2018 en el primer laboratorio de análisis de alimentos certificado en el país.
                    \nA lo largo de estos años, hemos evolucionado constantemente, incorporando nuevas metodologías, equipos de última generación y ampliando nuestro alcance de servicios para responder a las necesidades del sector alimentario boliviano.`}
        image={historia}
      />
      {/* Sección: Misión y Visión */}
      <GridSection
        title="Misión y Visión"
        items={misionVisionData}
        CardComponent={OutlinedIconCard}
        columns={2}
        backgroundColor="#F9FAFB"
      />
      {/* Sección: Nuestros Valores */}
      <GridSection
        title="Nuestros Valores"
        subtitle="Los principios que guían nuestro trabajo diario"
        items={valoresData}
        CardComponent={FlatIconCard}
        columns={4}
      />
      {/* Sección: Nuestro Equipo */}
      <GridSection
        title="Nuestro Equipo"
        subtitle="Profesionales especializados comprometidos con la excelencia"
        items={teamData}
        CardComponent={OutlinedImageCard}
        columns={3}
        backgroundColor="#F9FAFB"
      />
    </Box>
  );
}

export default AboutUsPage;