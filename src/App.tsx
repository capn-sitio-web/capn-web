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
import ContentDetailPage from "./presentation/pages/ContentDetailPage";
import ContactPage from "./presentation/pages/ContactPage";
{/* CMS */}
import AdminGate from "./admin/features/auth/presentation/AdminGate";
import DashboardPage from "./admin/features/dashboard/pages/DashboardPage";
import HomeManagementPage from "./admin/features/home/presentation/pages/HomeManagementPage";
import AboutManagementPage from "./admin/features/about/presentation/pages/AboutManagementPage";
import ServicesManagementPage from "./admin/features/services/presentation/pages/ServicesManagementPage";
import AccreditationManagementPage from "./admin/features/accreditation/presentation/pages/AccreditationManagementPage";
import NewsManagementPage from "./admin/features/news/presentation/pages/NewsManagementPage";
import ContactManagementPage from "./admin/features/contact/presentation/pages/ContactManagementPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Sitio Web */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
          <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
          <Route path={ROUTES.SERVICES_DETAIL} element={<ContentDetailPage type="service" />} />
          <Route path={ROUTES.ACCREDITATION} element={<AccreditationPage />} />
          <Route path={ROUTES.NEWS} element={<NewsPage />} />
          <Route path={ROUTES.NEWS_DETAIL} element={<ContentDetailPage type="news" />} />
          <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        </Route>
        {/* CMS */}
        <Route path={ROUTES.ADMIN} element={<AdminGate />}>
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.ADMIN_HOME} element={<HomeManagementPage />} />
          <Route path={ROUTES.ADMIN_ABOUT} element={<AboutManagementPage />} />
          <Route path={ROUTES.ADMIN_SERVICES} element={<ServicesManagementPage />} />
          <Route path={ROUTES.ADMIN_ACCREDITATION} element={<AccreditationManagementPage />} />
          <Route path={ROUTES.ADMIN_NEWS} element={<NewsManagementPage />} />
          <Route path={ROUTES.ADMIN_CONTACT} element={<ContactManagementPage />} />
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </Router>
  )
}

export default App;
