import type { DashboardKpi } from "../types/dashboard.types";

export const KPI_MOCK: DashboardKpi[] = [
  {
    id: "visitas",
    label: "Visitas Totales",
    value: "12,847",
    deltaText: "+12.5% vs período anterior",
    trend: "up",
  },
  {
    id: "formularios",
    label: "Formularios Enviados",
    value: "89",
    deltaText: "+8.2% vs período anterior",
    trend: "up",
  },
  {
    id: "paginasVistas",
    label: "Páginas Vistas",
    value: "45,231",
    deltaText: "+15.3% vs período anterior",
    trend: "up",
  },
  {
    id: "tiempoPromedio",
    label: "Tiempo Promedio",
    value: "3:24",
    deltaText: "-2.1% vs período anterior",
    trend: "down",
  },
];
