import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import QualitySystemTab, { type QualitySystemTabHandle } from "../tabs/QualitySystemTab";
// Types
import type { AccreditationQualitySystem } from "../../domain/accreditation.types";
// Services
import { accreditationQualitySystemService } from "../../data/accreditationQualitySystem.service";

type AccreditationTabKey = "sistemaCalidad";
const ACCREDITATION_TABS: PageTabItem<AccreditationTabKey>[] = [
  { value: "sistemaCalidad", label: "Sistema de Calidad" },
];

export default function AccreditationManagementPage() {
  const [tab, setTab] = useState<AccreditationTabKey>("sistemaCalidad");
  const [hasChanges, setHasChanges] = useState(false);

  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedQualitySystem, setSavedQualitySystem] = useState<AccreditationQualitySystem>({
    seccionId: null,
    sectionTitle: "",
    sectionDescription: "",
    cards: [
      {
        id: "1",
        icon: "document",
        title: "",
        description: "",
      },
    ],
  });

  // Estados de carga por sección
  const [loadingQualitySystem, setLoadingQualitySystem] = useState(true);

  // ref para ejecutar submit() desde el botón del header
  const qualitySystemRef = useRef<QualitySystemTabHandle | null>(null);

  const cargarSistemaCalidad = useCallback(async () => {
    try {
      setLoadingQualitySystem(true);
      const response = await accreditationQualitySystemService.obtenerSistemaCalidad();
      setSavedQualitySystem(response);
    } catch (error) {
      console.error("Error al obtener sistema de calidad:", error);
    } finally {
      setLoadingQualitySystem(false);
    }
  }, []);

  useEffect(() => {
    cargarSistemaCalidad();
  }, [cargarSistemaCalidad]);

  const handleSave = useCallback(async () => {
    if (tab === "sistemaCalidad") return (await qualitySystemRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
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
          {/* Sistema de calidad */}
          {tab === "sistemaCalidad" ? (
            loadingQualitySystem ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <QualitySystemTab
                ref={qualitySystemRef}
                initialValue={savedQualitySystem}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await accreditationQualitySystemService.actualizarSistemaCalidad(nextSaved);
                  setSavedQualitySystem(updated);
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
