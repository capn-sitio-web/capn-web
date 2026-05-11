import { ROUTES } from "../../../app/routes";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
//import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ScienceRoundedIcon from "@mui/icons-material/ScienceRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
/*import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";*/

export type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

export const NavItems: NavItem[] = [
  { label: "Dashboard", to: ROUTES.ADMIN, icon: <DashboardRoundedIcon /> },
  { label: "Inicio", to: ROUTES.ADMIN_HOME, icon: <HomeRoundedIcon /> },
  { label: "Nosotros", to: ROUTES.ADMIN_ABOUT, icon: <GroupsRoundedIcon /> },
  { label: "Servicios", to: ROUTES.ADMIN_SERVICES, icon: <ScienceRoundedIcon /> },
  { label: "Acreditación", to: ROUTES.ADMIN_ACCREDITATION, icon: <WorkspacePremiumRoundedIcon /> },
  { label: "Noticias", to: ROUTES.ADMIN_NEWS, icon: <NewspaperRoundedIcon /> },
  { label: "Contacto", to: ROUTES.ADMIN_CONTACT, icon: <ContactMailRoundedIcon /> },
  /*{ label: "Páginas", to: "/admin/site-pages", icon: <ArticleRoundedIcon /> },
  { label: "Banner Principal", to: "/admin/banners", icon: <ImageRoundedIcon /> },
  { label: "Configuración", to: "/admin/settings", icon: <SettingsRoundedIcon /> },*/
];
