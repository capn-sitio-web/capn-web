export type DashboardRange = "7d" | "14d" | "30d";

export type DashboardTrend = "up" | "down" | "neutral";

export interface DashboardKpi {
  id: string;
  label: string;
  value: number;
  trend: DashboardTrend;
  deltaText: string;
}

export interface MostVisitedPageItem {
  id: number;
  name: string;
  path: string;
  visits: number;
  percent: number;
}

export interface TrafficItem {
  date: string;
  visits: number;
}

export interface DashboardSummaryResponse {
  kpis: DashboardKpi[];
  mostVisitedPages: MostVisitedPageItem[];
  traffic: TrafficItem[];
}
