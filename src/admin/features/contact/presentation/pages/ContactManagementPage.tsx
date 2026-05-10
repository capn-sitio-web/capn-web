import { useCallback, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";

type ContactTabKey = "hero" | "ubicacion" | "datosContacto" | "redesSociales";
const CONTACT_TABS: PageTabItem<ContactTabKey>[] = [
  { value: "hero", label: "Portada" },
  { value: "ubicacion", label: "Ubicación" },
  { value: "datosContacto", label: "Datos de Contacto" },
  { value: "redesSociales", label: "Redes Sociales" },
];

export default function ContactManagementPage() {
  const [tab, setTab] = useState<ContactTabKey>("hero");
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
          {tab === "hero" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Portada de Contacto
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar el título, descripción e imagen superior de Contacto.
              </Typography>
            </Box>
          ) : null}

          {tab === "ubicacion" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Ubicación
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar la dirección, texto descriptivo y mapa embebido.
              </Typography>
            </Box>
          ) : null}

          {tab === "datosContacto" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Datos de Contacto
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar teléfono, correo, dirección y horarios de atención.
              </Typography>
            </Box>
          ) : null}

          {tab === "redesSociales" ? (
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Redes Sociales
              </Typography>
              <Typography color="text.secondary">
                Aquí irá el formulario para editar enlaces a Facebook, LinkedIn, correo u otros canales.
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>

      <FeedbackSnackbar
        feedback={feedback}
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        onExited={() => setFeedback(null)}
      />
    </Box>
  );
}
