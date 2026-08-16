import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";
import { queryClient } from "./presentation/config/queryClient";


import { ThemeProvider } from "@mui/material";
import { theme } from "./presentation/config/theme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ThemeProvider>
  </StrictMode >
);
