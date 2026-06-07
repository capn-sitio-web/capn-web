import { Card, CardContent, Typography, Box } from "@mui/material";
import { TrendingUpRounded, TrendingDownRounded, RemoveRounded } from "@mui/icons-material";
import type { DashboardKpi } from "../services/dashboard.types";

type Props = {
  item: DashboardKpi;
  rightIcon?: React.ReactNode;
};

export default function StatCard({ item, rightIcon }: Props) {
  const TrendIcon =
    item.trend === "up" ? TrendingUpRounded : item.trend === "down" ? TrendingDownRounded : RemoveRounded;

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {item.label}
            </Typography>
            <Typography variant="h5" fontWeight={800} sx={{ mt: 0.5 }}>
              {item.value.toLocaleString("es-BO")}
            </Typography>
          </Box>
          {rightIcon ? (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "action.hover",
                color: "#1F4BFF",
                display: "grid",
                placeItems: "center",
              }}
            >
              {rightIcon}
            </Box>
          ) : null}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <TrendIcon fontSize="small" />
          <Typography variant="caption" color="text.secondary">
            {item.deltaText}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
