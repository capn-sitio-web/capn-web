import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

interface Client {
  name: string;
  logo: string;
}

interface ClientsSectionProps {
  title: string;
  subtitle?: string;
  clients: Client[];
}

const ClientsSection: React.FC<ClientsSectionProps> = ({
  title,
  subtitle,
  clients,
}) => {
  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container>
        {/* Título */}
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
        {/* Logos */}
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {clients.map((client, index) => (
            <Grid
              item
              key={index}
              xs={6}
              sm={4}
              md={2}
            >
              <Box
                component="img"
                src={client.logo}
                alt={client.name}
                sx={{
                  width: "100%",
                  maxWidth: 120,
                  maxHeight: 120,
                  filter: "grayscale(100%) opacity(0.8)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    filter: "grayscale(0%) opacity(1)",
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientsSection;
