import React from "react";
import { Box, Grid, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface InfoImageSectionProps {
  title: string;
  description: string;
  image: string;
  items?: string[];
  buttonText?: string;
  buttonColor?: "primary" | "secondary" | "success" | "error" | "info";
  reverse?: boolean; // para cambiar el orden texto/imagen
  backgroundColor?: string;
}

const InfoImageSection: React.FC<InfoImageSectionProps> = ({
  title,
  description,
  image,
  items = [],
  buttonText,
  buttonColor = "primary",
  reverse = false,
  backgroundColor = "transparent",
}) => {
  return (
    <Box bgcolor={backgroundColor} py={6}>
      <Container>
        <Grid
          container
          spacing={6}
          alignItems="center" // centrado verticalmente
          direction={reverse ? "row-reverse" : "row"}
          justifyContent="space-between"
          textAlign="start" // horizaontalmente
        >
          {/* Texto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
              {title}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {description}
            </Typography>

            {items.length > 0 && (
              <List>
                {items.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color={buttonColor} />
                    </ListItemIcon>
                    <ListItemText primary={item} sx={{ color:"text.secondary" }} />
                  </ListItem>
                ))}
              </List>
            )}

            {buttonText && (
              <Button variant="contained" color={buttonColor} sx={{ mt: 2, textTransform: "none" }}>
                {buttonText}
              </Button>
            )}
          </Grid>

          {/* Imagen */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                width: "100%",
                maxWidth: 500,
                height: "auto",
                maxHeight: 350,
                borderRadius: 2,
                boxShadow: 5,
                objectFit: "cover", // mantiene la proporción sin deformar
                display: "block",
                margin: "0 auto", // centra la imagen
                filter: "brightness(0.9)", // oscurece la imagen
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default InfoImageSection;