import { Box } from "@mui/material";
import newsHero from "../../assets/page-headers/news.jpg";
import newsAccreditation from "../../assets/news-cover/noticiaacreditacion.jpg";
import newsFCYT from "../../assets/news-cover/noticiaFCYT.jpg";
import newsConvenio from "../../assets/news-cover/noticiaConvenio.jpg";
import newsCongreso from "../../assets/news-cover/noticiaCongreso.jpg";
import newsCromatografia from "../../assets/news-cover/noticiaCromatografia.jpg";
import newsAnalisisSensorial from "../../assets/news-cover/noticiaAnalisisSensorial.jpg";
import PageHeader from "../components/containers/PageHeader";
import NewsCarousel from "../components/sections/NewsCarousel";
import NewsGridSection from "../components/sections/NewsGridSection";
import CallToActionSection from "../components/containers/CallToActionSection";

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

const newsListaData = [
  {
    id: 1,
    category: "Convenios",
    date: "2024-02-28",
    title: "Nuevo convenio con empresas agroalimentarias de Cochabamba",
    description:
      "CAPN firma convenios estratégicos con principales productores de alimentos de la región para garantizar la calidad alimentaria.",
    image: newsConvenio,
    link: "#",
  },
  {
    id: 2,
    category: "Investigación",
    date: "2024-02-10",
    title: "Participación en el Congreso Latinoamericano de Ciencia y Tecnología de Alimentos",
    description:
      "Investigadores del CAPN presentaron avances en metodologías de análisis microbiológico en el evento regional más importante.",
    image: newsCongreso,
    link: "#",
  },
  {
    id: 3,
    category: "Equipamiento",
    date: "2024-01-20",
    title: "Adquisición de nuevo equipo de cromatografía líquida HPLC",
    description:
      "La inversión en tecnología de punta permite ampliar la capacidad de análisis de contaminantes y aditivos alimentarios.",
    image: newsCromatografia,
    link: "#",
  },
  {
    id: 4,
    category: "Capacitación",
    date: "2024-03-15",
    title: "Taller práctico de análisis sensorial de alimentos",
    description:
      "El laboratorio brindó capacitación sobre técnicas de evaluación sensorial dirigidas a la industria alimentaria local.",
    image: newsAnalisisSensorial,
    link: "#",
  },
  {
    id: 5,
    category: "Investigación",
    date: "2024-02-10",
    title: "Participación en el Congreso Latinoamericano de Ciencia y Tecnología de Alimentos",
    description:
      "Investigadores del CAPN presentaron avances en metodologías de análisis microbiológico en el evento regional más importante.",
    image: newsCongreso,
    link: "#",
  },
  {
    id: 6,
    category: "Equipamiento",
    date: "2024-01-20",
    title: "Adquisición de nuevo equipo de cromatografía líquida HPLC",
    description:
      "La inversión en tecnología de punta permite ampliar la capacidad de análisis de contaminantes y aditivos alimentarios.",
    image: newsCromatografia,
    link: "#",
  },
  {
    id: 7,
    category: "Capacitación",
    date: "2024-03-15",
    title: "Taller práctico de análisis sensorial de alimentos",
    description:
      "El laboratorio brindó capacitación sobre técnicas de evaluación sensorial dirigidas a la industria alimentaria local.",
    image: newsAnalisisSensorial,
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
      {/* Sección: Noticias Destacadas */}
      <NewsCarousel news={newsData} />
      {/* Sección: Lista de Noticias */}
      <NewsGridSection news={newsListaData} />
      {/* Sección: Tienes una noticia para compartir */}
      <CallToActionSection
        title="¿Tienes una noticia para compartir?"
        subtitle="Si eres parte de nuestra comunidad científica y tienes información relevante, contáctanos"
        primaryButton={{ label: "Contactar Redación" }}
        secondaryButton={{ label: "Conocer Nuestro Equipo" }}
      />
    </Box>
  );
};

export default NewsPage;
