import { Drawer, Divider, Toolbar, Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import capnLogo from "/logo.png";
import { NavItems } from "./NavItems";

export const DRAWER_WIDTH = 260;

type Props = {
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function Sidebar({ mobileOpen, onCloseMobile }: Props) {
  const drawerContent = (
    <Box sx={{ height: "100%" }}>
      <Toolbar sx={{ px: 2, m: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Logo */}
          <Box sx={{ display: "flex" }}>
            <img src={capnLogo} alt="CAPN Logo" style={{ height: 50 }} />
          </Box>
          <Typography variant="subtitle1" fontWeight={700}>
            CAPN UMSS
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <Box sx={{ px: 1 }}>
        <List>
          {NavItems.map((item) => (
            <ListItemButton
              key={item.to}
              component={NavLink}
              to={item.to}
              onClick={onCloseMobile}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&.active": {
                  bgcolor: "action.selected",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
