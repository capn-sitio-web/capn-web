import React, { useState } from "react";
import { Box, Chip, Container, Grid, Pagination } from "@mui/material";
import NewsCard from "../cards/NewsCard";

interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link?: string;
}

interface NewsGridSectionProps {
  news: NewsItem[];
}

const NewsGridSection: React.FC<NewsGridSectionProps> = ({ news }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const categories = ["Todas", ...new Set(news.map((item) => item.category))];
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredNews =
    selectedCategory === "Todas"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setPage(1); // Reset page
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              color="primary"
              sx={{
                p: 1.5,
              }}
              label={`${cat} (${cat === "Todas" ? news.length : news.filter((n) => n.category === cat).length})`}
            />
          ))}
        </Box>

        {/* News */}
        <Grid container spacing={4} justifyContent="center">
          {paginatedNews.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <NewsCard {...item} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
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
