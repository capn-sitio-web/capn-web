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
            ? "linear-gradient(90deg, #0A53E4 0%, #1966F0 100%)"
            : "white",
        color: background === "gradient" ? "white" : "text.primary",
        textAlign: "center",
        py: 8,
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
            color: 
              background === "gradient"
                ? "#1976D2"
                : "white",
            bgcolor: background === "gradient" ? "#fff" : "#1976D2",
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
                  : "#1976D2",
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