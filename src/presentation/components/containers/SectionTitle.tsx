import { Box, Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "center",
}) => (
  <Box textAlign={align} mb={{ xs: 4, md: 5 }}>
    <Typography
      variant="h4"
      fontWeight="bold"
      color="text.primary"
      gutterBottom
      sx={{
        fontSize: { xs: "1.8rem", md: "2.25rem" },
        lineHeight: 1.2,
      }}
    >
      {title}
    </Typography>

    {subtitle && (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: 720,
          mx: align === "center" ? "auto" : 0,
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionTitle;