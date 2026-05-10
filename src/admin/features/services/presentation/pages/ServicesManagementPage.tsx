import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import MicrobiologicalTab, { type MicrobiologicalTabHandle } from "../tabs/MicrobiologicalTab";
import PhysicochemicalTab, { type PhysicochemicalTabHandle } from "../tabs/PhysicochemicalTab";
import SensoryTab, { type SensoryTabHandle } from "../tabs/SensoryTab";
import SpecializedTab, { type SpecializedTabHandle } from "../tabs/SpecializedTab";
// Types
import type { ServiceMicrobiological, ServicePhysicochemical, ServiceSensory, ServiceSpecialized } from "../../domain/services.types";
// Services
import { servicesMicrobiologicalService } from "../../data/servicesMicrobiological.service";
import { servicesPhysicochemicalService } from "../../data/servicesPhysicochemical.service";
import { servicesSensoryService } from "../../data/servicesSensory.service";
import { servicesSpecializedService } from "../../data/servicesSpecialized.service";

type ServicesTabKey =
  | "hero"
  | "microbiologico"
  | "fisicoquimico"
  | "sensorial"
  | "especializado"
  | "procesoTrabajo"
  | "equiposTecnologia";
const SERVICES_TABS: PageTabItem<ServicesTabKey>[] = [
  { value: "hero", label: "Portada" },
  { value: "microbiologico", label: "Microbiológico" },
  { value: "fisicoquimico", label: "Fisicoquímico" },
  { value: "sensorial", label: "Sensorial" },
  { value: "especializado", label: "Especializado" },
  { value: "procesoTrabajo", label: "Proceso de Trabajo" },
  { value: "equiposTecnologia", label: "Equipos y Tecnología" },
];

export default function ServicesManagementPage() {
  const [tab, setTab] = useState<ServicesTabKey>("hero");
  const [hasChanges, setHasChanges] = useState(false);
  
  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedMicrobiological, setSavedMicrobiological] = useState<ServiceMicrobiological>({
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

  const [savedPhysicochemical, setSavedPhysicochemical] = useState<ServicePhysicochemical>({
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

  const [savedSensory, setSavedSensory] = useState<ServiceSensory>({
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

  const [savedSpecialized, setSavedSpecialized] = useState<ServiceSpecialized>({
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
  const [loadingMicrobiological, setLoadingMicrobiological] = useState(true);
  const [loadingPhysicochemical, setLoadingPhysicochemical] = useState(true);
  const [loadingSensory, setLoadingSensory] = useState(true);
  const [loadingSpecialized, setLoadingSpecialized] = useState(true);

  // ref para ejecutar submit() desde el botón del header
  const microbiologicalRef = useRef<MicrobiologicalTabHandle | null>(null);
  const physicochemicalRef = useRef<PhysicochemicalTabHandle | null>(null);
  const sensoryRef = useRef<SensoryTabHandle | null>(null);
  const specializedRef = useRef<SpecializedTabHandle | null>(null);

  const cargarMicrobiologico = useCallback(async () => {
    try {
      setLoadingMicrobiological(true);
      const response = await servicesMicrobiologicalService.obtenerMicrobiologico();
      setSavedMicrobiological(response);
    } catch (error) {
      console.error("Error al obtener análisis microbiológicos:", error);
    } finally {
      setLoadingMicrobiological(false);
    }
  }, []);

  const cargarFisicoquimico = useCallback(async () => {
    try {
      setLoadingPhysicochemical(true);
      const response = await servicesPhysicochemicalService.obtenerFisicoquimico();
      setSavedPhysicochemical(response);
    } catch (error) {
      console.error("Error al obtener análisis fisicoquímico:", error);
    } finally {
      setLoadingPhysicochemical(false);
    }
  }, []);

  const cargarSensorial = useCallback(async () => {
    try {
      setLoadingSensory(true);
      const response = await servicesSensoryService.obtenerSensorial();
      setSavedSensory(response);
    } catch (error) {
      console.error("Error al obtener análisis sensorial:", error);
    } finally {
      setLoadingSensory(false);
    }
  }, []);

  const cargarEspecializado = useCallback(async () => {
    try {
      setLoadingSpecialized(true);
      const response = await servicesSpecializedService.obtenerEspecializado();
      setSavedSpecialized(response);
    } catch (error) {
      console.error("Error al obtener análisis especializado:", error);
    } finally {
      setLoadingSpecialized(false);
    }
  }, []);

  useEffect(() => {
    cargarMicrobiologico();
    cargarFisicoquimico();
    cargarSensorial();
    cargarEspecializado();
  }, [cargarMicrobiologico, cargarFisicoquimico, cargarSensorial, cargarEspecializado]);

  const handleSave = useCallback(async () => {
    if (tab === "microbiologico") return (await microbiologicalRef.current?.submit()) ?? false;
    if (tab === "fisicoquimico") return (await physicochemicalRef.current?.submit()) ?? false;
    if (tab === "sensorial") return (await sensoryRef.current?.submit()) ?? false;
    if (tab === "especializado") return (await specializedRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
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
          {/* Analisis Microbiologico */}
          {tab === "microbiologico" ? (
            loadingMicrobiological ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <MicrobiologicalTab
                ref={microbiologicalRef}
                initialValue={savedMicrobiological}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await servicesMicrobiologicalService.actualizarMicrobiologico(nextSaved);
                  setSavedMicrobiological(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Analisis Fisicoquimico */}
          {tab === "fisicoquimico" ? (
            loadingPhysicochemical ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <PhysicochemicalTab
                ref={physicochemicalRef}
                initialValue={savedPhysicochemical}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await servicesPhysicochemicalService.actualizarFisicoquimico(nextSaved);
                  setSavedPhysicochemical(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Analisis Sensorial */}
          {tab === "sensorial" ? (
            loadingSensory ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <SensoryTab
                ref={sensoryRef}
                initialValue={savedSensory}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await servicesSensoryService.actualizarSensorial(nextSaved);
                  setSavedSensory(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Analisis Especializado */}
          {tab === "especializado" ? (
            loadingSpecialized ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <SpecializedTab
                ref={specializedRef}
                initialValue={savedSpecialized}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await servicesSpecializedService.actualizarEspecializado(nextSaved);
                  setSavedSpecialized(updated);
                  setHasChanges(false);
                }}
              />
            )
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
