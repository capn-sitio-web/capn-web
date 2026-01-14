import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
/*import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";*/

export type NavItem = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

export const NavItems: NavItem[] = [
  { label: "Dashboard", to: "/admin", icon: <DashboardRoundedIcon /> },
  { label: "Servicios", to: "/", icon: <DashboardRoundedIcon /> },
  { label: "Noticias", to: "/", icon: <DashboardRoundedIcon /> },
  /*{ label: "Páginas", to: "/admin/site-pages", icon: <ArticleRoundedIcon /> },
  { label: "Servicios", to: "/admin/services", icon: <DesignServicesRoundedIcon /> },
  { label: "Noticias", to: "/admin/news", icon: <NewspaperRoundedIcon /> },
  { label: "Banner Principal", to: "/admin/banners", icon: <ImageRoundedIcon /> },
  { label: "Contacto", to: "/admin/contact", icon: <ContactMailRoundedIcon /> },
  { label: "Configuración", to: "/admin/settings", icon: <SettingsRoundedIcon /> },*/
];
