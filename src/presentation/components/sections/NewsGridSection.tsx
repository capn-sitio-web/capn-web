import React from "react";
import { Box, Chip, Container, Grid, Pagination, Typography } from "@mui/material";
import NewsCard from "../cards/NewsCard";

interface NewsItem {
  id: number;
  category: string;
  categorySlug: string | null;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link: string;
}

interface NewsCategory {
  id: number;
  name: string;
  slug: string;
}

interface NewsPaginationData {
  currentPage: number;
  lastPage: number;
  total: number;
}

interface NewsGridSectionProps {
  news: NewsItem[];
  categories: NewsCategory[];
  selectedCategory: string | null;
  pagination: NewsPaginationData;
  onCategoryChange: (categorySlug: string | null) => void;
  onPageChange: (page: number) => void;
}

const NewsGridSection: React.FC<NewsGridSectionProps> = ({
  news,
  categories,
  selectedCategory,
  pagination,
  onCategoryChange,
  onPageChange,
}) => {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
          <Chip
            onClick={() => onCategoryChange(null)}
            variant={!selectedCategory ? "filled" : "outlined"}
            color="primary"
            sx={{ p: 1.5 }}
            label="Todas"
          />
          {categories.map((category) => (
            <Chip
              key={category.id}
              onClick={() => onCategoryChange(category.slug)}
              variant={ selectedCategory === category.slug ? "filled" : "outlined" }
              color="primary"
              sx={{ p: 1.5 }}
              label={category.name}
            />
          ))}
        </Box>

        {/* Si no hay noticias en una categoria */}
        {news.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No se encontraron noticias para esta categoría.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {news.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <NewsCard {...item} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {pagination.lastPage > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination
              count={pagination.lastPage}
              page={pagination.currentPage}
              onChange={(_, value) => onPageChange(value)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NewsGridSection;
