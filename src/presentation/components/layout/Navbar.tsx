import { useState } from "react";
import { AppBar, Box, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Tab, Tabs, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTES } from "../../../app/routes";
import capnLogo from "/logo.png";

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);
  const appBarHeight = isMobile ? 56 : 64;
  
  // Menú de navegación
  const menuItems = [
    { label: "Inicio", path: ROUTES.HOME },
    { label: "Nosotros", path: ROUTES.ABOUT },
    { label: "Servicios", path: ROUTES.SERVICES },
    { label: "Acreditación", path: ROUTES.ACCREDITATION },
    { label: "Noticias", path: ROUTES.NEWS },
    { label: "Contacto", path: ROUTES.CONTACT },
  ];
  
  return (
    <AppBar 
      color="inherit"
      //elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // asegura que quede arriba del Drawer
      }}
    >
      <Container>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: "flex" }}>
            <img src={capnLogo} alt="CAPN Logo" style={{ height: 50 }} />
          </Box>

          {/* Desktop menu */}
          {!isMobile && (
            <Tabs value={location.pathname} textColor="primary" indicatorColor="primary">
              {menuItems.map((item) => (
                <Tab
                  label={item.label}
                  value={item.path}
                  component={Link}
                  to={item.path}
                  sx={{ textTransform: "none" }}
                />
              ))}
            </Tabs>
          )}

          {/* Mobile menu */}
          {isMobile && (
            <>
              <IconButton
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                PaperProps={{
                  //elevation: 3,
                  sx: {
                    mt: `${appBarHeight}px`,
                    //borderTop: "1px solid #e0e0e0",
                    width: "80%",
                    mx: "auto",
                  },
                }}
              >
                <Box>
                  <List>
                    {menuItems.map((item) => (
                      <ListItem key={item.path} disablePadding>
                        <ListItemButton
                          component={Link}
                          to={item.path}
                          onClick={() => setOpenDrawer(false)}
                        >
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              color:
                                location.pathname === item.path ? "primary.main" : "text.primary",
                              fontWeight: location.pathname === item.path ? "bold" : 500,
                              fontSize: "1.1rem",
                              letterSpacing: "1px",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;