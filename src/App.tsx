import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
import Navbar from "./presentation/components/layout/Navbar";
import Footer from "./presentation/components/layout/Footer";
import HomePage from "./presentation/pages/HomePage";
import AboutUsPage from "./presentation/pages/AboutUsPage";
import ServicesPage from "./presentation/pages/ServicesPage";
import AccreditationPage from "./presentation/pages/AccreditationPage";
import NewsPage from "./presentation/pages/NewsPage";
import ContactPage from "./presentation/pages/ContactPage";
import { Box, useMediaQuery, useTheme } from "@mui/material";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const appBarHeight = isMobile ? 56 : 64;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // altura mínima igual a la ventana
        backgroundColor: "#fff",
        mt: `${appBarHeight}px`,
      }}
    >
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.ACCREDITATION} element={<AccreditationPage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </Box>
  )
}

export default App;
