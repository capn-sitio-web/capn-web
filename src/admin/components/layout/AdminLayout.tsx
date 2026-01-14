import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar, { DRAWER_WIDTH } from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMobile = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Topbar onOpenMobileMenu={openMobile} />
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={closeMobile} />
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
