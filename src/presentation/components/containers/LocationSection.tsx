import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import FlatIconCard from "../cards/FlatIconCard";

interface InfoItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface LocationSectionProps {
  title: string;
  subtitle?: string;
  mapSrc: string;
  infoItems?: InfoItem[];
}

const LocationSection: React.FC<LocationSectionProps> = ({
  title,
  subtitle,
  mapSrc,
  infoItems,
}) => {
  return (
    <Box sx={{ py: 8 }}>
      <Container>
        {/* Título y subtítulo */}
        <Box mb={3}>
          <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>

        {/* Mapa */}
        <Box
          component="iframe"
          src={mapSrc}
          sx={{
            width: "100%",
            height: 400,
            border: 0,
            borderRadius: 2,
            mb: 4,
          }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Info cards */}
        {infoItems && (
          <Box
            sx={{
              p: 3,
              bgcolor: "rgba(59,130,246,0.04)",
            }}
          >
            <Grid
              container
              spacing={6}
              justifyContent="center"
            >
              {infoItems.map((item, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <FlatIconCard {...item} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LocationSection;
