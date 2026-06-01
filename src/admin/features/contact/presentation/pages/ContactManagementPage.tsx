import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import ContactBannerTab, { type ContactBannerTabHandle } from "../tabs/ContactBannerTab";
import ContactInfoTab, { type ContactInfoTabHandle } from "../tabs/ContactInfoTab";
// Types
import type { ContactBanner, ContactInfo } from "../../domain/contact.types";
// Services
import { contactBannerService } from "../../data/contactBanner.service";
import { contactInfoService } from "../../data/contactInfo.service";

type ContactTabKey = "banner" | "datosContacto";
const CONTACT_TABS: PageTabItem<ContactTabKey>[] = [
  { value: "banner", label: "Portada" },
  { value: "datosContacto", label: "Datos de Contacto" },
];

export default function ContactManagementPage() {
  const [tab, setTab] = useState<ContactTabKey>("banner");
  const [hasChanges, setHasChanges] = useState(false);

  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedBanner, setSavedBanner] = useState<ContactBanner>({
    seccionId: null,
    sectionTitle: "",
    description: "",
    image: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "",
    },
  });
  
  const [savedContactInfo, setSavedContactInfo] = useState<ContactInfo>({
    seccionId: null,
    address: "",
    phone: "",
    email: "",
    facebookUrl: "",
    mapEmbedUrl: "",
  });

  // Estados de carga por sección
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [loadingContactInfo, setLoadingContactInfo] = useState(true);

  // ref para ejecutar submit() desde el botón del header
  const bannerRef = useRef<ContactBannerTabHandle | null>(null);
  const contactInfoRef = useRef<ContactInfoTabHandle | null>(null);
  
  const cargarBanner = useCallback(async () => {
    try {
      setLoadingBanner(true);
      const response = await contactBannerService.obtenerBanner();
      setSavedBanner(response);
    } catch (error) {
      console.error("Error al obtener banner:", error);
    } finally {
      setLoadingBanner(false);
    }
  }, []);

  const cargarInformacionContacto = useCallback(async () => {
    try {
      setLoadingContactInfo(true);
      const response = await contactInfoService.obtenerInformacionContacto();
      setSavedContactInfo(response);
    } catch (error) {
      console.error("Error al obtener información de contacto:", error);
    } finally {
      setLoadingContactInfo(false);
    }
  }, []);

  useEffect(() => {
    cargarBanner();
    cargarInformacionContacto();
  }, [cargarBanner, cargarInformacionContacto]);

  const handleSave = useCallback(async () => {
    if (tab === "banner") return (await bannerRef.current?.submit()) ?? false;
    if (tab === "datosContacto") return (await contactInfoRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
  const handleTabChange = useCallback(
    (nextTab: ContactTabKey) => {
      if (nextTab === tab) return;
      if (hasChanges) {
        showFeedback({
          message: "Tienes cambios pendientes. Guarda antes de cambiar de pestaña.",
          severity: "warning",
        });
        return;
      }
      setTab(nextTab);
    },
    [tab, hasChanges, showFeedback]
  );

  // Wrapper general para mostrar mensaje de exito
  const handleSaveWithFeedback = useCallback(async () => {
    const savedOk = await handleSave();
    if (savedOk) {
      showFeedback({
        message: "Los cambios se guardaron correctamente.",
        severity: "success",
      });
      return;
    }
  }, [handleSave, showFeedback]);

  return (
    <Box>
      <PageHeader
        title="Gestión de Contacto"
        subtitle="Administra el contenido de la página Contacto"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs value={tab} tabs={CONTACT_TABS} onChange={handleTabChange} />
        <CardContent sx={{ mt: 1 }}>
          {/* Banner */}
          {tab === "banner" ? (
            loadingBanner ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ContactBannerTab
                ref={bannerRef}
                initialValue={savedBanner}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await contactBannerService.actualizarBanner(nextSaved);
                  setSavedBanner(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Información de contacto */}
          {tab === "datosContacto" ? (
            loadingContactInfo ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ContactInfoTab
                ref={contactInfoRef}
                initialValue={savedContactInfo}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await contactInfoService.actualizarInformacionContacto(nextSaved);
                  setSavedContactInfo(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
        </CardContent>
      </Card>
      {/* Mensaje de exito y advertencia */}
      <FeedbackSnackbar
        feedback={feedback}
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onExited={() => setFeedback(null)}
      />
    </Box>
  );
}
