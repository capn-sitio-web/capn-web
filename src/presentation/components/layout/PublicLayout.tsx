import { Outlet } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const appBarHeight = isMobile ? 56 : 64;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // altura mínima igual a la ventana
        bgcolor: "background.default",
        mt: `${appBarHeight}px`,
      }}
    >
      <Navbar />
      <Box component="main" sx={{ textAlign: "center" }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
