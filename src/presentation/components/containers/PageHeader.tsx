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
        minHeight: { xs: 230, md: 290 },
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(15, 23, 42, 0.72) 0%, rgba(11, 126, 167, 0.58) 55%, rgba(15, 23, 42, 0.42) 100%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15, 23, 42, 0.10) 0%, rgba(15, 23, 42, 0.30) 100%)",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            color: "common.white",
            fontSize: { xs: "2rem", md: "2.6rem" },
            lineHeight: 1.15,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.92)",
              fontWeight: 600,
              maxWidth: 760,
              mx: "auto",
              lineHeight: 1.6,
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
