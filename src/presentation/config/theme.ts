import { createTheme } from "@mui/material/styles";

export const capnColors = {
  primary: "#0B7EA7",      // Azul institucional/laboratorio
  primaryDark: "#075E7D",
  primaryLight: "#EAF6FA",

  secondary: "#B7242B",    // Rojo del logo
  accent: "#E6C91E",       // Amarillo trigo del logo

  navy: "#0F172A",         // Footer / textos fuertes
  navySoft: "#1E293B",

  background: "#F8FAFC",
  surface: "#FFFFFF",

  textPrimary: "#111827",
  textSecondary: "#64748B",

  border: "#E2E8F0",
};

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: capnColors.primary,
      dark: capnColors.primaryDark,
      light: capnColors.primaryLight,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: capnColors.secondary,
      contrastText: "#FFFFFF",
    },
    warning: {
      main: capnColors.accent,
    },
    background: {
      default: capnColors.background,
      paper: capnColors.surface,
    },
    text: {
      primary: capnColors.textPrimary,
      secondary: capnColors.textSecondary,
    },
    divider: capnColors.border,
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: capnColors.background,
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "9px 18px",
          boxShadow: "none",
        },
        contained: {
          boxShadow: "0 8px 18px rgba(11, 126, 167, 0.18)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${capnColors.border}`,
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 14px rgba(15, 23, 42, 0.08)",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: "none",
          minHeight: 64,
        },
      },
    },
  },
});