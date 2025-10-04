import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
import HomePage from "./presentation/pages/HomePage";
import AboutUsPage from "./presentation/pages/AboutUsPage";
import ServicesPage from "./presentation/pages/ServicesPage";
import AccreditationPage from "./presentation/pages/AccreditationPage";
import NewsPage from "./presentation/pages/NewsPage";
import ContactPage from "./presentation/pages/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
        <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
        <Route path={ROUTES.ACCREDITATION} element={<AccreditationPage />} />
        <Route path={ROUTES.NEWS} element={<NewsPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Routes>
    </Router>
  )
}

export default App;
