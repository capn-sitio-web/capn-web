import React from "react";
import { Box, Typography, Container } from "@mui/material";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  backgroundImage,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 8, md: 11 },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          //background: "linear-gradient(90deg, rgba(0,64,128,0.85) 0%, rgba(0,100,200,0.85) 100%)",
          background: "linear-gradient(90deg, rgba(55, 118, 182, 0.85) 0%, rgba(200, 217, 233, 0.85) 100%)",
          opacity: 0.6,
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PageHeader;
