import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, LinkedIn, Email, Room, Phone } from "@mui/icons-material";
import { ROUTES } from "../../../app/routes";
import { Link } from "react-router-dom";
import capnLogo from "/logo.png";
import { useContactPage } from "../../services/contact/useContactPage";
import { capnColors } from "../../config/theme";

// Subcomponente: lista de enlaces
interface FooterLinksProps {
  title: string;
  links: { label: string; path: string }[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => (
  <Box textAlign={{ xs: 'center', sm: 'left' }}>
    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    {links.map((link) => (
      <MuiLink
        key={link.label}
        component={Link}
        to={link.path}
        underline="none"
        color="inherit"
        sx={{
          display: "block",
          opacity: 0.8,
          mb: 0.8,
          transition: "color 0.2s ease",
          "&:hover": {
            color: "primary.main",
            opacity: 1,
          },
        }}
      >
        {link.label}
      </MuiLink>
    ))}
  </Box>
);

// Subcomponente: redes sociales
interface SocialLinksProps {
  socials: { icon: React.ReactNode; href: string }[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ socials }) => (
  <>
    {socials.map((social) => (
      <IconButton
        color="inherit"
        size="small"
        href={social.href}
        target="_blank"
      >
        {social.icon}
      </IconButton>
    ))}
  </>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { data } = useContactPage();
  const contact = data?.location;

  const socialLinks = [
    { icon: <Facebook />, href: contact?.facebookUrl ?? "" },
    { icon: <LinkedIn />, href: "https://www.linkedin.com" },
    { icon: <Email />, href: contact?.email ? `mailto:${contact.email}` : "" },
  ];
  const infoLinks = [
    { label: "Nosotros", path: ROUTES.ABOUT },
    { label: "Acreditación", path: ROUTES.ACCREDITATION },
    { label: "Noticias", path: ROUTES.NEWS },
    { label: "Contacto", path: ROUTES.CONTACT },
  ];
  const serviceLinks = [
    { label: "Análisis Microbiológicos", path: ROUTES.SERVICES },
    { label: "Análisis Fisicoquímicos", path: ROUTES.SERVICES },
    { label: "Análisis Sensoriales", path: ROUTES.SERVICES },
    { label: "Análisis Especializados", path: ROUTES.SERVICES },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: capnColors.navy,
        color: "rgba(255,255,255,0.88)",
        pt: 6,
        pb: 2,
        mt: "auto",
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Columna 1: Logo, descripción y redes sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center" mb={2}>
              <img
                src={capnLogo}
                alt="CAPN Logo"
                style={{
                  height: 48,
                  marginRight: 10,
                  background: "white",
                  borderRadius: 8,
                  padding: 3,
                }}
              />
              <Typography variant="h6" fontWeight="bold">
                CAPN
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Centro especializado en alimentos y productos naturales,
              certificado ISO/IEC 17025.
            </Typography>
            <Box mt={2} textAlign={{ xs: 'center', sm: 'left' }}>
              <SocialLinks socials={socialLinks} />
            </Box>
          </Grid>

          {/* Columna 2: Servicios */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterLinks title="Servicios" links={serviceLinks} />
          </Grid>

          {/* Columna 3: Información */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterLinks title="Información" links={infoLinks} />
          </Grid>

          {/* Columna 4: Contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Box
              display='flex'
              flexDirection='column'
              alignItems={{ xs: 'center', sm: 'flex-start' }}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Contacto
              </Typography>
              <Box display="flex" alignItems="flex-start" mb={1}>
                <Room fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 200 }}>
                  {contact?.locationName ?? ""}
                  <br />
                  Cochabamba, Bolivia
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mb={1}>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 200 }}>
                  {contact?.phone ?? ""}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: 200 }}>
                  {contact?.email ?? ""}
                </Typography>
              </Box>
            </Box>

          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Derechos reservados */}
        <Typography
          variant="body2"
          align="center"
          sx={{ opacity: 0.7 }}
        >
          © {currentYear} CAPN - Centro de Alimentos y Productos Naturales. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;