// src/presentation/components/containers/CTASection.tsx
import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  //ButtonProps,
} from "@mui/material";
import type { ButtonProps } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Action =
  | string
  | {
      label: string;
      to?: string;                 // para navegación interna
      href?: string;               // para enlace externo
      onClick?: () => void;
      color?: ButtonProps["color"];
      variant?: ButtonProps["variant"];
    };

interface CTASectionProps {
  title: string;
  subtitle?: string;
  button1?: Action;
  button2?: Action;
}

const normalize = (btn?: Action) => {
  if (!btn) return undefined;
  return typeof btn === "string" ? { label: btn } : btn;
};

const LinkBehavior = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(
  (props, ref) => <RouterLink ref={ref} {...props} />
);

const CTASection: React.FC<CTASectionProps> = ({ title, subtitle, button1, button2 }) => {
  const a1 = normalize(button1);
  const a2 = normalize(button2);

  const renderButton = (a: ReturnType<typeof normalize>, fallbackVariant: ButtonProps["variant"]) => {
    if (!a) return null;

    // decide el componente segun props
    const common: ButtonProps = {
      variant: a.variant ?? fallbackVariant,
      color: a.color ?? (fallbackVariant === "contained" ? "primary" : "inherit"),
      sx: { minWidth: 180 },
      onClick: a.onClick,
    };

    if (a.to) {
      return (
        <Button
          {...common}
          component={RouterLink}
          to={a.to as string}
        >
          {a.label}
        </Button>
      );
    }
    if (a.href) {
      return (
        <Button
          {...(common as ButtonProps & React.ComponentProps<'a'>)}
          component="a"
          href={a.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {a.label}
        </Button>
      );
    }
    return <Button {...common}>{a.label}</Button>;
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 8 },
        color: "white",
        // gradiente azul tipo mockup
        background: "linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center" textAlign="center">
          <Typography variant="h4" fontWeight="bold">
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ opacity: 0.95, maxWidth: 900 }}>
              {subtitle}
            </Typography>
          )}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
            alignItems="center"
          >
            {renderButton(a1, "contained")}
            {renderButton(a2, "outlined")}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
