import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt?: string;
  link: string;
}

interface NewsCarouselProps {
  news: NewsItem[];
}

const NewsCarousel: React.FC<NewsCarouselProps> = ({ news }) => {
  if (news.length === 0) return null;
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          //navigation // muestra el boton de atras y adelante
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          loop={news.length > 1}
          autoHeight={true} // cada slide toma su propia altura
          style={{ paddingBottom: "40px" }}
        >
          {news.map((item) => (
            <SwiperSlide key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "stretch",
                  borderRadius: 3,
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  bgcolor: "#f9fbff",
                }}
              >
                {/* Text */}
                <Box
                  sx={{
                    p: 4,
                    textAlign:"start",
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                  <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {item.description}
                  </Typography>

                  <Button
                    component={Link}
                    to={item.link}
                    variant="contained"
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Leer Noticia Completa
                  </Button>
                </Box>

                {/* Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.imageAlt ?? item.title}
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    objectFit: "cover",
                    height: { xs: 250, md: "auto" },
                    borderRadius: { md: "0 12px 12px 0" },
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default NewsCarousel;
