import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CardPageSkeleton from "../components/skeletons/CardPageSkeleton";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import newsHero from "../../assets/page-headers/news.jpg";
import PageHeader from "../components/containers/PageHeader";
import NewsCarousel from "../components/sections/NewsCarousel";
import NewsGridSection from "../components/sections/NewsGridSection";
import CallToActionSection from "../components/containers/CallToActionSection";
import { useNewsPage } from "../services/news/useNewsPage";

const NewsPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, loading, error } = useNewsPage({
    page,
    category: selectedCategory,
  });

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setPage(1);
  };

  if (loading) {
    return <CardPageSkeleton />;
  }

  if (error || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">
          No se pudo cargar la información de noticias.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Sección: Cabecera */}
      {data.banner && (
        <PageHeader
          title={data.banner.title}
          subtitle={data.banner.subtitle}
          backgroundImage={data.banner.image || newsHero}
        />
      )}
      {/* Sección: Noticias Destacadas */}
      <NewsCarousel news={data.featured} />
      {/* Sección: Lista de Noticias */}
      <NewsGridSection
        news={data.news}
        categories={data.categories}
        selectedCategory={selectedCategory}
        pagination={data.pagination}
        onCategoryChange={handleCategoryChange}
        onPageChange={setPage}
      />
      {/* Sección: Tienes una noticia para compartir */}
      <CallToActionSection
        title="¿Tienes una noticia para compartir?"
        subtitle="Si eres parte de nuestra comunidad científica y tienes información relevante, contáctanos"
        primaryButton={{ label: "Contactar Redación", onClick: () => navigate(ROUTES.CONTACT) }}
        secondaryButton={{ label: "Conocer Nuestro Equipo", onClick: () => navigate(ROUTES.ABOUT) }}
      />
    </Box>
  );
};

export default NewsPage;
