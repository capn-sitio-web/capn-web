import { useCallback, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";

type HomeTabKey =
  | "hero"
  | "servicios"
  | "calidad"
  | "estadisticas"
  | "clientes";
const HOME_TABS: PageTabItem<HomeTabKey>[] = [
  { value: "hero", label: "Portada" },
  { value: "servicios", label: "Servicios" },
  { value: "calidad", label: "Calidad Certificada" },
  { value: "estadisticas", label: "Estadísticas" },
  { value: "clientes", label: "Clientes" },
];

export default function HomeManagementPage() {
  const [tab, setTab] = useState<HomeTabKey>("hero");
  const [hasChanges, setHasChanges] = useState(false);

  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    // Aquí luego llamarás al submit del tab activo con refs.
    // Ejemplo: if (tab === "hero") return await heroRef.current?.submit()
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

          {tab === "servicios" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Nuestros Servicios
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para administrar las tarjetas de servicios mostradas en Inicio.
              </Typography>
            </Box>
          ) : null}

          {tab === "calidad" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Calidad Certificada
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar el bloque de certificación, beneficios e imagen.
              </Typography>
            </Box>
          ) : null}

          {tab === "estadisticas" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Estadísticas
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar años de experiencia, análisis realizados, empresas atendidas y satisfacción.
              </Typography>
            </Box>
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
