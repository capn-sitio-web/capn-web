import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useContactPage } from "../../services/contact/useContactPage";

function normalizeWhatsappNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (!cleaned) return "";
  if (cleaned.startsWith("591")) {
    return cleaned;
  }
  return `591${cleaned}`;
}

const FloatingWhatsAppButton = () => {
  const { data } = useContactPage();
  const [isHovered, setIsHovered] = useState(false);
  const contact = data?.location;
  const mainPhone =
    contact?.phones.find((phone) => phone.isPrimary)?.value ??
    contact?.phones[0]?.value ??
    "";
  const whatsappNumber = normalizeWhatsappNumber(mainPhone);
  if (!whatsappNumber) return null;
  const message = encodeURIComponent(
    "Hola, quisiera solicitar información sobre los servicios del CAPN."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: { xs: 18, md: 28 },
        bottom: { xs: 18, md: 28 },
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          display: { xs: "none", sm: "block" },
          bgcolor: "white",
          color: "text.primary",
          px: 2,
          py: 0.8,
          borderRadius: 8,
          boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
          fontSize: "0.95rem",
          fontWeight: 500,
          whiteSpace: "nowrap",
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(0)" : "translateX(10px)",
          pointerEvents: "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        ¡Comunícate con nosotros!
      </Typography>
      <IconButton
        onClick={handleOpenWhatsApp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar por WhatsApp"
        sx={{
          width: { xs: 58, md: 66 },
          height: { xs: 58, md: 66 },
          bgcolor: "#25D366",
          color: "white",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            bgcolor: "#20BD5A",
            transform: "translateY(-3px) scale(1.04)",
          },
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 38 } }} />
      </IconButton>
    </Box>
  );
};

export default FloatingWhatsAppButton;
