import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Chip, Button } from "@mui/material";

interface NewsCardProps {
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link: string;
}

const categoryColors: Record<string, string> = {
  "Acreditación": "#3B82F6",
  "Investigación": "#6366F1",
  "Convenios": "#F97316",
  "Equipamiento": "#8B5CF6",
  "Capacitación": "#10B981",
  "default": "#6B7280",
};

const NewsCard: React.FC<NewsCardProps> = ({
  category,
  date,
  title,
  description,
  image,
  imageAlt,
  link,
}) => {
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 410,
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          boxShadow: "0 16px 36px rgba(15, 23, 42, 0.10)",
          borderColor: "primary.light",
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={imageAlt ?? title}
        sx={{
          width: "100%",
          height: 155,
          objectFit: "cover",
          display: "block",
          bgcolor: "primary.light",
        }}
      />
      {/* Text */}
      <Box sx={{ p: 3, textAlign: "left" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <Chip
            label={category}
            sx={{
              backgroundColor: categoryColors[category] || categoryColors.default,
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {date}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          fontWeight={800}
          color="text.primary"
          gutterBottom
          sx={{
            lineHeight: 1.35,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        <Box sx={{ mt: "auto", pt: 2 }}>
          <Button
            component={Link}
            to={link}
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 800,
              color: "primary.main",
              px: 0,
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Leer más →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NewsCard;
