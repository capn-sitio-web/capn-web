import { Box, Container, Typography, Chip, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ROUTES } from "../../app/routes";
import NewsGallerySection from "../components/sections/NewsGallerySection";
import CardPageSkeleton from "../components/skeletons/CardPageSkeleton";
import { useNewsDetail } from "../services/news/useNewsDetail";
import { useServiceDetail } from "../services/services/useServiceDetail";

type ContentDetailPageProps = {
  type: "news" | "service";
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/\s+on\w+\s*=\s*(['"])(.*?)\1/gi, "")
    .replace(/\s+style\s*=\s*(['"])(.*?)\1/gi, "")
    .replace(/\s+class\s*=\s*(['"])(.*?)\1/gi, "");
}

function normalizeContent(content: string, type: "news" | "service"): string {
  if (type === "news") {
    return escapeHtml(content).replace(/\n/g, "<br />");
  }
  const sanitized = sanitizeHtml(content);
  return sanitized.replace(/\n/g, "<br />");
}

const ContentDetailPage = ({ type }: ContentDetailPageProps) => {
  const { idnoticia, slug } = useParams();
  const parsedNewsId = idnoticia ? Number(idnoticia) : null;

  const newsQuery = useNewsDetail(
    type === "news" && Number.isFinite(parsedNewsId) ? parsedNewsId : null
  );

  const serviceQuery = useServiceDetail(type === "service" ? slug ?? null : null);

  const data = type === "news" ? newsQuery.data : serviceQuery.data;
  const loading = type === "news" ? newsQuery.loading : serviceQuery.loading;
  const error = type === "news" ? newsQuery.error : serviceQuery.error;

  const backTo = type === "news" ? ROUTES.NEWS : ROUTES.SERVICES;
  const backLabel = type === "news" ? "Volver a noticias" : "Volver a servicios";
  const errorMessage =
    type === "news"
      ? "No se pudo cargar la noticia solicitada."
      : "No se pudo cargar el detalle del servicio.";

  if (loading) {
    return <CardPageSkeleton />;
  }

  if (error || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">{errorMessage}</Typography>
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
          backgroundColor: "#0F172A",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(0,0,0,0.45)",
          }}
        />

        <Button
          component={RouterLink}
          to={backTo}
          startIcon={<ArrowBackIcon />}
          sx={{
            position: "fixed",
            top: { xs: 70, md: 90 },
            left: { xs: 15, md: 24 },
            zIndex: 2,
            color: "primary.main",
            bgcolor: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(6px)",
            borderRadius: { xs: "50%", md: 1 },
            minWidth: { xs: 44, md: "auto" },
            width: { xs: 44, md: "auto" },
            height: { xs: 44, md: "auto" },
            "& .MuiButton-startIcon": {
              margin: { xs: 0, md: "0 8px 0 -4px" },
            },
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.28)",
            },
          }}
        >
          <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
            {backLabel}
          </Box>
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
          <Box color="white" sx={{ textAlign: "left" }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{
                maxWidth: 900,
                lineHeight: 1.15,
                fontSize: {
                  xs: "1.9rem",
                  sm: "2.4rem",
                  md: "3rem",
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

              {data.date && <Typography>{data.date}</Typography>}
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="md">
        <Box py={8}>
          <Box
            sx={{
              textAlign: "left",
              color: "text.primary",
              lineHeight: 2,
              fontSize: "1.05rem",

              "& p": {
                marginTop: 0,
                marginBottom: "1rem",
              },

              "& b, & strong": {
                fontWeight: 700,
              },

              "& ul, & ol": {
                paddingLeft: "1.5rem",
                marginTop: "0.5rem",
                marginBottom: "1rem",
              },

              "& li": {
                marginBottom: "0.4rem",
              },

              "& div": {
                marginBottom: "0.5rem",
              },
            }}
            dangerouslySetInnerHTML={{
              __html: normalizeContent(data.content, type),
            }}
          />
        </Box>
      </Container>

      {data.gallery.length > 0 && <NewsGallerySection images={data.gallery} />}
    </Box>
  );
};

export default ContentDetailPage;
