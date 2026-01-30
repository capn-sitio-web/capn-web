import { useCallback, useRef, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
import AboutHeader from "../components/AboutHeader";
import AboutTabs, { type AboutTabKey } from "../components/AboutTabs";
import HistoryTab, { type HistoryTabHandle } from "../components/HistoryTab";
import { aboutHistoryMock } from "../../data/aboutHistory.mock";
import type { History } from "../../domain/about.types";

export default function AboutManagementPage() {
  const [tab, setTab] = useState<AboutTabKey>("historia");
  const [hasChanges, setHasChanges] = useState(false);

  // “Lo guardado” (simulado)
  const [savedHistory, setSavedHistory] = useState<History>(aboutHistoryMock);
  
  // ref para ejecutar submit() desde el botón del header
  const historyRef = useRef<HistoryTabHandle | null>(null);

  const handleSave = useCallback(() => {
    if (tab === "historia") {
      const ok = historyRef.current?.submit() ?? false;
      // si ok, el tab ya llamó onCommitSave y tú puedes limpiar hasChanges ahí
      // si no ok, se muestran errores inline y NO se limpia
      return;
    }
    // luego aquí: misionVisionRef.current?.submit(), etc.
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
          {tab === "historia" ? (
            <HistoryTab
              ref={historyRef}
              initialValue={savedHistory}
              onHistoryChange={setHasChanges}
              onCommitSave={(nextSaved) => {
                // simula persistencia (luego será API)
                setSavedHistory(nextSaved);
                setHasChanges(false);
              }}
            />
          ) : null}

          {/* luego aquí conectas los otros tabs */}
          {tab === "misionVision" ? <div>TODO: Misión y Visión</div> : null}
          {tab === "valores" ? <div>TODO: Valores</div> : null}
          {tab === "equipo" ? <div>TODO: Equipo</div> : null}
        </CardContent>
      </Card>
    </Box>
  );
}
