export type DashboardKpi = {
  id: "visitas" | "formularios" | "paginasVistas" | "tiempoPromedio";
  label: string;
  value: string;
  deltaText: string; // "+12.5% vs período anterior"
  trend: "up" | "down" | "neutral";
};
