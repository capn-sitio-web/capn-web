import { Box, Container, Typography, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router-dom";
import NewsGallerySection from "../components/sections/NewsGallerySection";
import CardPageSkeleton from "../components/skeletons/CardPageSkeleton";
import { useNewsDetail } from "../services/news/useNewsDetail";

const NewsDetailPage = () => {
  const { idnoticia } = useParams();

  const parsedId = idnoticia ? Number(idnoticia) : null;

  const { data, loading, error } = useNewsDetail(
    Number.isFinite(parsedId) ? parsedId : null
  );

  if (loading) {
    return <CardPageSkeleton />;
  }

  if (error || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">
          No se pudo cargar la noticia solicitada.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: { xs: 430, sm: 460, md: 500 },
          backgroundImage: `url(${data.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.45)",
          }}
        />
        {/* boton de volver a noticias */}
        <Button
          component={RouterLink}
          to="/noticias"
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "absolute",
            top: 24,
            left: 24,
            zIndex: 2,
            color: "white",
            bgcolor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 1,
            px: 2,
            py: 0.8,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.28)",
            },
          }}
        >
          Volver a noticias
        </Button>

        <Container
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            pb: { xs: 3, md: 5 },
          }}
        >
          <Box
            color="white"
            sx={{ textAlign: "left" }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              //sx={{ maxWidth: 900 }}
              sx={{
                maxWidth: 900,
                lineHeight: 1.15,
                fontSize: {
                  xs: "1.9rem",  // celulares
                  sm: "2.4rem",  // tablets pequeñas
                  md: "3rem",    // pantallas medianas
                },
              }}
            >
              {data.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              {data.category && (
                <Chip
                  label={data.category}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              )}
              <Typography>{data.date}</Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Box py={8}>
          <Typography
            variant="body1"
            color="text.primary"
            textAlign={"left"}
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 2,
              fontSize: "1.05rem",
            }}
          >
            {data.content}
          </Typography>
        </Box>
      </Container>

      {data.gallery.length > 0 && (
        <NewsGallerySection images={data.gallery} />
      )}
    </Box>
  );
};

export default NewsDetailPage;
