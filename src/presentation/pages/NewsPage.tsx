import { Box } from "@mui/material";
import newsHero from "../../assets/page-headers/news.jpg";
import newsAccreditation from "../../assets/news-cover/noticiaacreditacion.jpg";
import newsFCYT from "../../assets/news-cover/noticiaFCYT.jpg";
import PageHeader from "../components/containers/PageHeader";
import NewsCarousel from "../components/sections/NewsCarousel";

const newsData = [
  {
    id: 1,
    title: "CAPN obtiene acreditación ISO/IEC 17025 para análisis de residuos de plaguicidas",
    date: "2024-03-15",
    description:
      "El laboratorio amplía su alcance de acreditación incluyendo nuevos ensayos especializados en seguridad alimentaria.",
    image: newsAccreditation,
    link: "#",
  },
  {
    id: 2,
    title: "Nuevo laboratorio sensorial para análisis de calidad de alimentos",
    date: "2024-05-10",
    description:
      "Se inaugura un laboratorio sensorial equipado para evaluar características organolépticas de productos alimenticios.",
    image: newsHero,
    link: "#",
  },
  {
    id: 3,
    title: "Convenio con la Facultad de Ciencias y Tecnología",
    date: "2024-07-02",
    description:
      "El CAPN firma un convenio para fortalecer la investigación y la formación profesional en el área de alimentos.",
    image: newsFCYT,
    link: "#",
  },
];

const NewsPage = () => {
  return (
    <Box>
      {/* Sección: Cabecera */}
      <PageHeader
        title="Noticias y Publicaciones"
        subtitle="Mantente informado sobre nuestros logros, nuevas acreditaciones, investigaciones y actividades del CAPN"
        backgroundImage={newsHero}
      />
      {/* Sección de Noticias Destacadas */}
      <NewsCarousel news={newsData} />
    </Box>
  );
};

export default NewsPage;
