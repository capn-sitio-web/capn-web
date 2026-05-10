import { useCallback, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";

type ServicesTabKey =
  | "hero"
  | "analisis"
  | "procesoTrabajo"
  | "equiposTecnologia";
const SERVICES_TABS: PageTabItem<ServicesTabKey>[] = [
  { value: "hero", label: "Portada" },
  { value: "analisis", label: "Análisis" },
  { value: "procesoTrabajo", label: "Proceso de Trabajo" },
  { value: "equiposTecnologia", label: "Equipos y Tecnología" },
];

export default function ServicesManagementPage() {
  const [tab, setTab] = useState<ServicesTabKey>("hero");
  const [hasChanges, setHasChanges] = useState(false);

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    return false;
  }, []);

  const handleSaveWithFeedback = useCallback(async () => {
    const savedOk = await handleSave();

    if (savedOk) {
      showFeedback({
        message: "Los cambios se guardaron correctamente.",
        severity: "success",
      });
      return;
    }

    showFeedback({
      message: "Aún no hay un formulario conectado para guardar esta sección.",
      severity: "info",
    });
  }, [handleSave, showFeedback]);

  const handleTabChange = useCallback(
    (nextTab: ServicesTabKey) => {
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

  return (
    <Box>
      <PageHeader
        title="Gestión de Servicios"
        subtitle="Administra el contenido de la página Servicios"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs value={tab} tabs={SERVICES_TABS} onChange={handleTabChange} />

        <CardContent sx={{ mt: 1 }}>
          {tab === "hero" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Portada de Servicios
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar el título, descripción e imagen superior de Servicios.
              </Typography>
            </Box>
          ) : null}

          {tab === "analisis" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Tipos de Análisis
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para administrar análisis microbiológicos, fisicoquímicos, sensoriales y especializados.
              </Typography>
            </Box>
          ) : null}

          {tab === "procesoTrabajo" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Proceso de Trabajo
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar las etapas del proceso de trabajo.
              </Typography>
            </Box>
          ) : null}

          {tab === "equiposTecnologia" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Equipos y Tecnología
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para administrar las tarjetas de equipos e instrumentos.
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
