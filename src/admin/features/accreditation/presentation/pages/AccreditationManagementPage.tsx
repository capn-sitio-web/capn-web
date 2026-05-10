import { useCallback, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";

type AccreditationTabKey = "sistemaCalidad";
const ACCREDITATION_TABS: PageTabItem<AccreditationTabKey>[] = [
  { value: "sistemaCalidad", label: "Sistema de Calidad" },
];

export default function AccreditationManagementPage() {
  const [tab, setTab] = useState<AccreditationTabKey>("sistemaCalidad");
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
    (nextTab: AccreditationTabKey) => {
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
        title="Gestión de Acreditación"
        subtitle="Administra el contenido de la página Acreditación"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />

      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs
          value={tab}
          tabs={ACCREDITATION_TABS}
          onChange={handleTabChange}
        />

        <CardContent sx={{ mt: 1 }}>
          {tab === "sistemaCalidad" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Sistema de Calidad
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar el sistema de calidad, etapas, textos e íconos de acreditación.
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
