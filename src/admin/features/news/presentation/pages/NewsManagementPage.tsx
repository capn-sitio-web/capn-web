import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import NewsBannerTab, { type NewsBannerTabHandle } from "../tabs/NewsBannerTab";
import NewsPostsTab from "../tabs/NewsPostsTab";
// Types
import type { NewsBanner } from "../../domain/news.types";
// Services
import { newsBannerService } from "../../data/newsBanner.service";

type NewsTabKey = "banner" | "noticias";
const NEWS_TABS: PageTabItem<NewsTabKey>[] = [
  { value: "banner", label: "Portada" },
  { value: "noticias", label: "Noticias" },
];

export default function NewsManagementPage() {
  const [tab, setTab] = useState<NewsTabKey>("banner");
  const [hasChanges, setHasChanges] = useState(false);

  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedBanner, setSavedBanner] = useState<NewsBanner>({
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

  // Estados de carga por sección
  const [loadingBanner, setLoadingBanner] = useState(true);

  // ref para ejecutar submit() desde el botón del header
  const bannerRef = useRef<NewsBannerTabHandle | null>(null);

  const cargarBanner = useCallback(async () => {
    try {
      setLoadingBanner(true);
      const response = await newsBannerService.obtenerBanner();
      setSavedBanner(response);
    } catch (error) {
      console.error("Error al obtener banner:", error);
    } finally {
      setLoadingBanner(false);
    }
  }, []);

  useEffect(() => {
    cargarBanner();
  }, [cargarBanner]);

  const handleSave = useCallback(async () => {
    if (tab === "banner") return (await bannerRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
  const handleTabChange = useCallback(
    (nextTab: NewsTabKey) => {
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
        title="Gestión de Noticias"
        subtitle="Administra las publicaciones y noticias del laboratorio"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs value={tab} tabs={NEWS_TABS} onChange={handleTabChange} />
        <CardContent sx={{ mt: 1 }}>
          {/* Banner */}
          {tab === "banner" ? (
            loadingBanner ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <NewsBannerTab
                ref={bannerRef}
                initialValue={savedBanner}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await newsBannerService.actualizarBanner(nextSaved);
                  setSavedBanner(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Noticias */}
          {tab === "noticias" ? (
            <NewsPostsTab onFeedback={showFeedback} />
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
