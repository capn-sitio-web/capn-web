import { useState } from "react";
import { Box, Grid, CircularProgress, Typography, Snackbar, Alert } from "@mui/material";
import {
  VisibilityOutlined,
  MailOutlineRounded,
  PeopleAltOutlined,
} from "@mui/icons-material";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import TrafficCard from "../components/TrafficCard";
import MostVisitedPagesCard from "../components/MostVisitedPagesCard";
import { useDashboardSummary } from "../services/useDashboardSummary";
import { useDeleteOldSiteVisits } from "../services/useDeleteOldSiteVisits";
import type { DashboardRange } from "../services/dashboard.types";
import ConfirmCleanDialog from "../components/ConfirmCleanDialog";

const kpiIconById: Record<string, React.ReactNode> = {
  visitas: <VisibilityOutlined fontSize="small" />,
  formularios: <MailOutlineRounded fontSize="small" />,
  visitantesUnicos: <PeopleAltOutlined fontSize="small" />,
};

export default function DashboardPage() {
  const [range, setRange] = useState<DashboardRange>("7d");

  const { data, isLoading, isError } = useDashboardSummary(range);
  const deleteOldVisitsMutation = useDeleteOldSiteVisits();

  // eliminar visitas antiguas mayores a 30 dias
  const handleOpenCleanDialog = () => {
    setOpenCleanDialog(true);
  };
  const handleCloseCleanDialog = () => {
    if (deleteOldVisitsMutation.isPending) return;
    setOpenCleanDialog(false);
  };
  const handleConfirmCleanOldVisits = () => {
    deleteOldVisitsMutation.mutate(undefined, {
      onSuccess: (response) => {
        setOpenCleanDialog(false);
        setSnackbar({
          open: true,
          message: `Limpieza completada. Registros eliminados: ${response.deleted}`,
          severity: "success",
        });
      },
      onError: () => {
        setSnackbar({
          open: true,
          message: "No se pudieron eliminar las visitas antiguas.",
          severity: "error",
        });
      },
    });
  };

  const [openCleanDialog, setOpenCleanDialog] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  if (isLoading) {
    return (
      <Box py={8} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return (
      <Box py={8} textAlign="center">
        <Typography color="error">
          No se pudo cargar la información del dashboard.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <DashboardHeader
        range={range}
        onChangeRange={setRange}
        onCleanOldVisits={handleOpenCleanDialog}
        isCleaning={deleteOldVisitsMutation.isPending}
      />
      {/* KPIs */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {data.kpis.map((kpi) => (
          <Grid item key={kpi.id} xs={12} sm={6} lg={4}>
            <StatCard item={kpi} rightIcon={kpiIconById[kpi.id]} />
          </Grid>
        ))}
      </Grid>
      {/* Tráfico + Más visitadas */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} lg={7}>
          <TrafficCard items={data.traffic} range={range} />
        </Grid>

        <Grid item xs={12} lg={5}>
          <MostVisitedPagesCard items={data.mostVisitedPages} />
        </Grid>
      </Grid>
      {/* dialog y alert de eliminar noticias antiguas */}
      <ConfirmCleanDialog
        open={openCleanDialog}
        loading={deleteOldVisitsMutation.isPending}
        onClose={handleCloseCleanDialog}
        onConfirm={handleConfirmCleanOldVisits}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
