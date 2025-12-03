import React, { useState } from "react";
import { Box, Chip, Container, Grid } from "@mui/material";
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

  const filteredNews =
    selectedCategory === "Todas"
      ? news
      : news.filter((item) => item.category === selectedCategory);

  return (
    <Box sx={{ py: 6 }}>
      <Container>
        {/* Filtros */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", mb: 4 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? "filled" : "outlined"}
              color="primary"
              sx={{
                p: 1.5,
              }}
              label={`${cat} (${cat === "Todas" ? news.length : news.filter((n) => n.category === cat).length})`}
            />
          ))}
        </Box>

        {/* Grilla de noticias */}
        <Grid container spacing={4} justifyContent="center">
          {filteredNews.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <NewsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsGridSection;
