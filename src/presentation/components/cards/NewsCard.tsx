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
        borderRadius: 3,
        height: "100%",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
        "&:hover .news-image": {
          transform: "scale(1.06)",
        },
      }}
    >
      {/* Image */}
      <Box
        className="news-image"
        component="img"
        src={image}
        alt={imageAlt ?? title}
        sx={{
          width: "100%",
          height: 180,
          objectFit: "cover",
          transition: "transform 0.4s ease",
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

        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Button
          component={Link}
          to={link}
          size="small"
          sx={{
            mt: 2,
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Leer más →
        </Button>
      </Box>
    </Box>
  );
};

export default NewsCard;
