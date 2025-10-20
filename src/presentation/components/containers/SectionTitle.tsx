import { Box, Typography } from "@mui/material";
import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, align = "center" }) => (
  <Box textAlign={align} mb={4}>
    <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body1" color="text.primary" sx={{ opacity: 0.8 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

export default SectionTitle;