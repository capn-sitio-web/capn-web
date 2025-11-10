import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";

interface OutlinedImageCardProps {
  image?: string;
  title: string;
  subtitle?: string;
  description: string;
}

const OutlinedImageCard: React.FC<OutlinedImageCardProps> = ({ image, title, subtitle, description }) => (
  <Card
    elevation={2}
    sx={{
      borderRadius: 3,
      textAlign: "center",
      pt: 2,
      height: "100%",
      transition: "transform 0.2s ease",
      "&:hover": { transform: "translateY(-6px)" },
    }}
  >
    <CardContent>
      {image && <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar 
          sx={{ width: 120, height: 120 }}
          alt={`${title} Image`}
          src={image}
        />
      </Box>}
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{ color: "#1976D2" }}
        >
          {subtitle}
        </Typography>
      )}
      <Typography 
        variant="body2"
        textAlign="center"
        sx={{ mt: 1, opacity: 0.8 }}>
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default OutlinedImageCard;