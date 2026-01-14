import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Tooltip,
} from "@mui/material";
import { MenuRounded, NotificationsNoneRounded } from "@mui/icons-material";
import { DRAWER_WIDTH } from "./Sidebar";

type Props = {
  onOpenMobileMenu: () => void;
};

export default function Topbar({ onOpenMobileMenu }: Props) {
  return (
    <AppBar
      elevation={0}
      color="inherit"
      sx={{ 
        borderBottom: 1, 
        borderColor: "divider",
        width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
      }}
    >
      <Toolbar sx={{ gap: 1, m: 0.5 }}>
        <IconButton // Botón menú solo en mobile
          onClick={onOpenMobileMenu}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
        >
          <MenuRounded />
        </IconButton>

        <Typography 
          variant="subtitle1"
          color="text.primary"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          Panel de Administración
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Tooltip title="Notificaciones">
          <IconButton>
            <NotificationsNoneRounded />
          </IconButton>
        </Tooltip>

        <Button
          href="/" target="_blank" rel="noreferrer"
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            backgroundColor: "#EFF6FF",
            color: "#1F4BFF",
            "&:hover": {
              backgroundColor: "#DBEAFE",
            },
          }}
        >
          Ver Sitio Web
        </Button>
      </Toolbar>
    </AppBar>
  );
}
