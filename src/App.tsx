import "./App.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ROUTES } from "./app/routes";
{/* Sitio Web */}
import PublicLayout from "./presentation/components/layout/PublicLayout";
import HomePage from "./presentation/pages/HomePage";
import AboutUsPage from "./presentation/pages/AboutUsPage";
import ServicesPage from "./presentation/pages/ServicesPage";
import AccreditationPage from "./presentation/pages/AccreditationPage";
import NewsPage from "./presentation/pages/NewsPage";
import ContactPage from "./presentation/pages/ContactPage";
{/* CMS */}
import AdminGate from "./admin/features/auth/presentation/AdminGate";
import DashboardPage from "./admin/features/dashboard/pages/DashboardPage";
import AboutManagePage from "./admin/features/about/presentation/pages/AboutManagePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Sitio Web */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.ACCREDITATION} element={<AccreditationPage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Route>
        {/* CMS */}
        <Route path={ROUTES.ADMIN} element={<AdminGate />}>
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.ADMIN_ABOUT} element={<AboutManagePage />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  )
}

export default App;
