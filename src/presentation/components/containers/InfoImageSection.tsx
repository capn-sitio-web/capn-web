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
  buttonOnClick?: () => void;
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
  buttonOnClick,
  reverse = false,
  backgroundColor = "transparent",
}) => {
  return (
    <Box
      sx={{
        bgcolor: backgroundColor,
        py: { xs: 7, md: 9 },
      }}
    >
      <Container>
        <Grid
          container
          spacing={6}
          alignItems="center" // centrado verticalmente
          direction={reverse ? "row-reverse" : "row"}
          justifyContent="space-between"
          textAlign="start" // horizontalmente
        >
          {/* Texto */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              color="text.primary"
              sx={{ lineHeight: 1.2 }}
            >
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
                    <ListItemText primary={item} sx={{ color: "text.secondary" }} />
                  </ListItem>
                ))}
              </List>
            )}

            {buttonText && (
              <Button
                variant="contained"
                color={buttonColor}
                onClick={buttonOnClick}
                sx={{
                  mt: 2, textTransform: "none"
                }}>
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
                maxWidth: 520,
                height: { xs: 240, md: 330 },
                borderRadius: "15px",
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 55px rgba(15, 23, 42, 0.16)",
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