import type { DashboardKpi, MostVisitedPageItem } from "../types/dashboard.types";

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

export const MOST_VISITED_MOCK: MostVisitedPageItem[] = [
  { id: "inicio", name: "Inicio", visits: 8547, percent: 38 },
  { id: "servicios", name: "Servicios", visits: 5234, percent: 23 },
  { id: "acreditacion", name: "Acreditación", visits: 3421, percent: 15 },
  { id: "noticias", name: "Noticias", visits: 2876, percent: 13 },
  { id: "contacto", name: "Contacto", visits: 2453, percent: 11 },
];
