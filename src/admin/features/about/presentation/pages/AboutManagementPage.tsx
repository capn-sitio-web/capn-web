import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import PageHeader from "../../../../components/PageHeader";
import PageTabs, { type PageTabItem } from "../../../../components/PageTabs";
import FeedbackSnackbar, { type FeedbackState } from "../../../../components/FeedbackSnackbar";
// Tabs
import HistoryTab, { type HistoryTabHandle } from "../tabs/HistoryTab";
import MissionVisionTab, { type MissionVisionTabHandle } from "../tabs/MissionVisionTab";
import ValuesTab, { type ValuesTabHandle } from "../tabs/ValuesTab";
import TeamTab, { type TeamTabHandle } from "../tabs/TeamTab";
// Types
import type { History, MissionVision, Values, Team } from "../../domain/about.types";
// Services
import { aboutHistoryService } from "../../data/aboutHistory.service";
import { aboutMissionVisionService } from "../../data/aboutMissionVision.service";
import { aboutValuesService } from "../../data/aboutValues.service";
import { aboutTeamService } from "../../data/aboutTeam.service";

type AboutTabKey = "historia" | "misionVision" | "valores" | "equipo";
const ABOUT_TABS: PageTabItem<AboutTabKey>[] = [
  { value: "historia", label: "Historia" },
  { value: "misionVision", label: "Misión y Visión" },
  { value: "valores", label: "Valores" },
  { value: "equipo", label: "Equipo" },
];

export default function AboutManagementPage() {
  const [tab, setTab] = useState<AboutTabKey>("historia");
  const [hasChanges, setHasChanges] = useState(false);
  
  // Mensajes globales
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const showFeedback = useCallback((nextFeedback: FeedbackState) => {
    setFeedback(nextFeedback);
    setFeedbackOpen(true);
  }, []);

  // Estado persistido por sección
  const [savedHistory, setSavedHistory] = useState<History>({
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

  const [savedMissionVision, setSavedMissionVision] = useState<MissionVision>({
    seccionId: null,
    missionElementId: null,
    visionElementId: null,
    mission: "",
    vision: "",
  });

  const [savedValues, setSavedValues] = useState<Values>({
    seccionId: null,
    sectionTitle: "",
    sectionDescription: "",
    cards: [
      {
        id: "1",
        icon: "shield",
        title: "",
        description: "",
      },
    ],
  });

  const [savedTeam, setSavedTeam] = useState<Team>({
    seccionId: null,
    sectionTitle: "",
    sectionDescription: "",
    members: [
      {
        id: "1",
        personalId: null,
        image: {
          file: null,
          previewUrl: "",
          imageId: null,
          alt: "",
        },
        name: "",
        position: "",
        description: "",
      },
    ],
  });

  // Estados de carga por sección
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingMissionVision, setLoadingMissionVision] = useState(true);
  const [loadingValues, setLoadingValues] = useState(true);
  const [loadingTeam, setLoadingTeam] = useState(true);
  
  // ref para ejecutar submit() desde el botón del header
  const historyRef = useRef<HistoryTabHandle | null>(null);
  const missionVisionRef = useRef<MissionVisionTabHandle | null>(null);
  const valuesRef = useRef<ValuesTabHandle | null>(null);
  const teamRef = useRef<TeamTabHandle | null>(null);

  const cargarHistoria = useCallback(async () => {
    try {
      setLoadingHistory(true);
      const response = await aboutHistoryService.obtenerHistoria();
      setSavedHistory(response);
    } catch (error) {
      console.error("Error al obtener historia:", error);
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const cargarMisionVision = useCallback(async () => {
    try {
      setLoadingMissionVision(true);
      const response = await aboutMissionVisionService.obtenerMisionVision();
      setSavedMissionVision(response);
    } catch (error) {
      console.error("Error al obtener misión y visión:", error);
    } finally {
      setLoadingMissionVision(false);
    }
  }, []);

  const cargarValores = useCallback(async () => {
    try {
      setLoadingValues(true);
      const response = await aboutValuesService.obtenerValores();
      setSavedValues(response);
    } catch (error) {
      console.error("Error al obtener valores:", error);
    } finally {
      setLoadingValues(false);
    }
  }, []);

  const cargarEquipo = useCallback(async () => {
    try {
      setLoadingTeam(true);
      const response = await aboutTeamService.obtenerEquipo();
      setSavedTeam(response);
    } catch (error) {
      console.error("Error al obtener equipo:", error);
    } finally {
      setLoadingTeam(false);
    }
  }, []);

  useEffect(() => {
    cargarHistoria();
    cargarMisionVision();
    cargarValores();
    cargarEquipo();
  }, [cargarHistoria, cargarMisionVision, cargarValores, cargarEquipo]);

  const handleSave = useCallback(async () => {
    if (tab === "historia") return (await historyRef.current?.submit()) ?? false;
    if (tab === "misionVision") return (await missionVisionRef.current?.submit()) ?? false;
    if (tab === "valores") return (await valuesRef.current?.submit()) ?? false;
    if (tab === "equipo") return (await teamRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  // Cambiar de tab: si hay cambios pendientes, bloquea el cambio
  const handleTabChange = useCallback(
    (nextTab: AboutTabKey) => {
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
    }
  }, [handleSave, showFeedback]);

  return (
    <Box>
      <PageHeader
        title="Gestión de Nosotros"
        subtitle="Administra el contenido de la página Nosotros"
        disableSave={!hasChanges}
        onSave={handleSaveWithFeedback}
      />
      
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <PageTabs value={tab} tabs={ABOUT_TABS} onChange={handleTabChange} />
        <CardContent sx={{ mt: 1 }}>
          {/* Historia */}
          {tab === "historia" ? (
            loadingHistory ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <HistoryTab
                ref={historyRef}
                initialValue={savedHistory}
                onHistoryChange={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await aboutHistoryService.actualizarHistoria(nextSaved);
                  setSavedHistory(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Mision y vision */}
          {tab === "misionVision" ? (
            loadingMissionVision ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <MissionVisionTab
                ref={missionVisionRef}
                initialValue={savedMissionVision}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await aboutMissionVisionService.actualizarMisionVision(nextSaved);
                  setSavedMissionVision(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Valores */}
          {tab === "valores" ? (
            loadingValues ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ValuesTab
                ref={valuesRef}
                initialValue={savedValues}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await aboutValuesService.actualizarValores(nextSaved);
                  setSavedValues(updated);
                  setHasChanges(false);
                }}
              />
            )
          ) : null}
          {/* Equipo */}
          {tab === "equipo" ? (
            loadingTeam ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TeamTab
                ref={teamRef}
                initialValue={savedTeam}
                onChanges={setHasChanges}
                onCommitSave={async (nextSaved) => {
                  const updated = await aboutTeamService.actualizarEquipo(nextSaved);
                  setSavedTeam(updated);
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
