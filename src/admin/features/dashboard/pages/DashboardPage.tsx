import { useState } from "react";
import { Box, Grid } from "@mui/material";
import { VisibilityOutlined, MailOutlineRounded, DescriptionOutlined, AccessTimeRounded } from "@mui/icons-material";
import DashboardHeader from "../components/DashboardHeader";
import StatCard from "../components/StatCard";
import MostVisitedPagesCard from "../components/MostVisitedPagesCard";
import { KPI_MOCK, MOST_VISITED_MOCK } from "../data/dashboard.mock";

const kpiIconById: Record<string, React.ReactNode> = {
  visitas: <VisibilityOutlined fontSize="small" />,
  formularios: <MailOutlineRounded fontSize="small" />,
  paginasVistas: <DescriptionOutlined fontSize="small" />,
  tiempoPromedio: <AccessTimeRounded fontSize="small" />,
};

export default function DashboardPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("7d");

  const kpis = KPI_MOCK;
  const mostVisited = MOST_VISITED_MOCK;

  return (
    <Box>
      <DashboardHeader range={range} onChangeRange={setRange} />

      {/* KPIs */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {kpis.map((kpi) => (
          <Grid item key={kpi.id} xs={12} sm={6} lg={3}>
            <StatCard item={kpi} rightIcon={kpiIconById[kpi.id]} />
          </Grid>
        ))}
      </Grid>

      {/* Tráfico + Más visitadas */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} lg={5}>
          <MostVisitedPagesCard items={mostVisited} />
        </Grid>
      </Grid>
    </Box>
  );
}
