import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DashboardRange, TrafficItem } from "../services/dashboard.types";

type Props = {
  items: TrafficItem[];
  range: DashboardRange;
};

function formatDateLabel(date: string) {
  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "short",
  });
}

function getRangeLabel(range: DashboardRange) {
  if (range === "7d") return "Datos de los últimos 7 días";
  if (range === "14d") return "Datos de los últimos 14 días";
  return "Datos de los últimos 30 días";
}

export default function TrafficCard({ items, range }: Props) {
  const theme = useTheme();

  const chartData = items.map((item) => ({
    ...item,
    label: formatDateLabel(item.date),
  }));

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography fontWeight={700}>Tráfico del Sitio</Typography>
          <Typography variant="caption" color="text.secondary">
            {getRangeLabel(range)}
          </Typography>
        </Box>

        <Box
          sx={{
            height: 280,
            borderRadius: 3,
            bgcolor: "rgba(25, 118, 210, 0.04)",
            pt: 3,
            pr: 2,
            pb: 1,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 16, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="trafficGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(0,0,0,0.08)"
              />

              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: theme.palette.text.secondary }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                cursor={{ stroke: theme.palette.primary.main, strokeWidth: 1 }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                }}
                formatter={(value) => [`${value} visitas`, "Visitas"]}
                labelFormatter={(label) => `Fecha: ${label}`}
              />

              <Area
                type="monotone"
                dataKey="visits"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                fill="url(#trafficGradient)"
                activeDot={{
                  r: 6,
                  strokeWidth: 2,
                  stroke: "#fff",
                  fill: theme.palette.primary.main,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
