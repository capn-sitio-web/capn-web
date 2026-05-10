import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import ServicesTab, { type ServicesTabHandle } from "../tabs/ServicesTab";
import QualityTab, { type QualityTabHandle } from "../tabs/QualityTab";
// Types
import type { HomeServices, HomeQuality } from "../../domain/home.types";
// Services
import { homeServicesService } from "../../data/homeServices.service";
import { homeQualityService } from "../../data/homeQuality.service";

type HomeTabKey =
  | "hero"
  | "servicios"
  | "calidad"
  | "clientes";
const HOME_TABS: PageTabItem<HomeTabKey>[] = [
  { value: "hero", label: "Portada" },
  { value: "servicios", label: "Servicios" },
  { value: "calidad", label: "Calidad Certificada" },
  { value: "clientes", label: "Clientes" },
];

export default function HomeManagementPage() {
  const [tab, setTab] = useState<HomeTabKey>("hero");
  const [hasChanges, setHasChanges] = useState(false);

  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedServices, setSavedServices] = useState<HomeServices>({
    seccionId: null,
    sectionTitle: "",
    sectionDescription: "",
    cards: [
      {
        id: "1",
        icon: "flask",
        title: "",
        description: "",
      },
    ],
  });

  const [savedQuality, setSavedQuality] = useState<HomeQuality>({
    seccionId: null,
    sectionTitle: "",
    sectionDescription: "",
    items: [
      {
        id: "1",
        text: "",
      },
    ],
    image: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "",
    },
  });

  // Estados de carga por sección
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingQuality, setLoadingQuality] = useState(true);

  // ref para ejecutar submit() desde el botón del header
  const servicesRef = useRef<ServicesTabHandle | null>(null);
  const qualityRef = useRef<QualityTabHandle | null>(null);

  const cargarServicios = useCallback(async () => {
    try {
      setLoadingServices(true);
      const response = await homeServicesService.obtenerServicios();
      setSavedServices(response);
    } catch (error) {
      console.error("Error al obtener servicios de inicio:", error);
    } finally {
      setLoadingServices(false);
    }
  }, []);

  const cargarCalidad = useCallback(async () => {
    try {
      setLoadingQuality(true);
      const response = await homeQualityService.obtenerCalidad();
      setSavedQuality(response);
    } catch (error) {
      console.error("Error al obtener calidad certificada de inicio:", error);
    } finally {
      setLoadingQuality(false);
    }
  }, []);

  useEffect(() => {
    cargarServicios();
    cargarCalidad();
  }, [cargarServicios, cargarCalidad]);

  const handleSave = useCallback(async () => {
    if (tab === "servicios") return (await servicesRef.current?.submit()) ?? false;
    if (tab === "calidad") return (await qualityRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
  const handleTabChange = useCallback(
    (nextTab: HomeTabKey) => {
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
        title="Gestión de Inicio"
        subtitle="Administra el contenido principal de la página Inicio"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs value={tab} tabs={HOME_TABS} onChange={handleTabChange} />

        <CardContent sx={{ mt: 1 }}>
          {tab === "hero" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Portada principal
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar el título, descripción, botones e imagen principal.
              </Typography>
            </Box>
          ) : null}
          {/* Servicios */}
          {tab === "servicios" ? (
            loadingServices ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ServicesTab
                ref={servicesRef}
                initialValue={savedServices}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await homeServicesService.actualizarServicios(nextSaved);
                  setSavedServices(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Calidad certificada */}
          {tab === "calidad" ? (
            loadingQuality ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <QualityTab
                ref={qualityRef}
                initialValue={savedQuality}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await homeQualityService.actualizarCalidad(nextSaved);
                  setSavedQuality(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}

          {tab === "clientes" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Nuestros Clientes
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para administrar los logotipos de clientes.
              </Typography>
            </Box>
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
