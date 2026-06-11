import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";

interface CallToActionSectionProps {
  title: string;
  subtitle: string;
  primaryButton: {
    label: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    label: string;
    variant?: "outlined" | "contained";
    onClick?: () => void;
  };
  background?: "white" | "gradient";
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
  background = "gradient",
}) => {
  return (
    <Box
      sx={{
        background:
          background === "gradient"
            ? "linear-gradient(90deg, #075E7D 0%, #0B7EA7 55%, #0F172A 100%)"
            : "background.paper",
        color: background === "gradient" ? "white" : "text.primary",
        textAlign: "center",
        py: { xs: 7, md: 8 },
        px: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        color={background === "gradient" ? "white" : "text.primary"}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color={background === "gradient" ? "rgba(255,255,255,0.9)" : "text.secondary"}
        mb={4}
      >
        {subtitle}
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={"center"}
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={primaryButton.onClick}
          sx={{
            textTransform: "none",
            color: background === "gradient" ? "primary.dark" : "common.white",
            bgcolor: background === "gradient" ? "common.white" : "primary.main",
            fontWeight: 700,
            "&:hover": {
              color: background === "gradient" ? "#1976D2" : undefined,
              backgroundColor: background === "gradient" ? "rgba(255,255,255,0.9)" : undefined,
            },
          }}
        >
          {primaryButton.label}
        </Button>

        {secondaryButton && (
          <Button
            variant={secondaryButton.variant || "outlined"}
            onClick={secondaryButton.onClick}
            sx={{
              textTransform: "none",
              color:
                background === "gradient"
                  ? "white"
                  : "primary.main",
              borderColor:
                background === "gradient" ? "rgba(255,255,255,0.6)" : "#1976D2",
              "&:hover": {
                borderColor:
                  background === "gradient" ? "rgba(255,255,255,0.9)" : undefined,
              },
            }}
          >
            {secondaryButton.label}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default CallToActionSection;