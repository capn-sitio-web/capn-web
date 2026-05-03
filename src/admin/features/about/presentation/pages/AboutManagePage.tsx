import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import AboutHeader from "../components/AboutHeader";
import AboutTabs, { type AboutTabKey } from "../components/AboutTabs";
// Tabs
import HistoryTab, { type HistoryTabHandle } from "../tabs/HistoryTab";
import MissionVisionTab, { type MissionVisionTabHandle } from "../tabs/MissionVisionTab";
// Types
import type { History, MissionVision } from "../../domain/about.types";
// Services
import { aboutHistoryService } from "../../data/aboutHistory.service";
import { aboutMissionVisionService } from "../../data/aboutMissionVision.service";

export default function AboutManagementPage() {
  const [tab, setTab] = useState<AboutTabKey>("historia");
  const [hasChanges, setHasChanges] = useState(false);

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

  // Estados de carga por sección
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingMissionVision, setLoadingMissionVision] = useState(true);
  
  // ref para ejecutar submit() desde el botón del header
  const historyRef = useRef<HistoryTabHandle | null>(null);
  const missionVisionRef = useRef<MissionVisionTabHandle | null>(null);

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

  useEffect(() => {
    cargarHistoria();
    cargarMisionVision();
  }, [cargarHistoria, cargarMisionVision]);

  const handleSave = useCallback(async () => {
    if (tab === "historia") return (await historyRef.current?.submit()) ?? false;
    if (tab === "misionVision") return (await missionVisionRef.current?.submit()) ?? false;
    return false;
  }, [tab]);

  return (
    <Box>
      <AboutHeader
        title="Gestión de Nosotros"
        subtitle="Administra el contenido de la página Nosotros"
        disableSave={!hasChanges}
        onSave={handleSave}
      />
      
      <Card variant="outlined" sx={{ borderRadius: 3 }}>
        <AboutTabs value={tab} onChange={setTab} />
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

          {/* luego aquí conectas los otros tabs */}
          {tab === "valores" ? <div>TODO: Valores</div> : null}
          {tab === "equipo" ? <div>TODO: Equipo</div> : null}
        </CardContent>
      </Card>
    </Box>
  );
}
