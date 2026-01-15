export type DashboardKpi = {
  id: "visitas" | "formularios" | "paginasVistas" | "tiempoPromedio";
  label: string;
  value: string;
  deltaText: string; // "+12.5% vs período anterior"
  trend: "up" | "down" | "neutral";
};

export type MostVisitedPageItem = {
  id: string;
  name: string;
  visits: number;
  percent: number; // 0-100
};
