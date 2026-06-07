import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import type { MostVisitedPageItem } from "../services/dashboard.types";

type Props = {
  items: MostVisitedPageItem[];
};

export default function MostVisitedPagesCard({ items }: Props) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Typography fontWeight={700}>Páginas Más Visitadas</Typography>

        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {items.map((it, idx) => (
            <Box key={it.id} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Typography variant="caption" fontWeight={700}>
                  {idx + 1}
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography fontWeight={600}>{it.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {it.visits.toLocaleString()} visitas
                </Typography>
              </Box>

              <Box sx={{ width: { xs: 90, sm: 120 }, flexShrink: 0 }}>
                <LinearProgress
                  variant="determinate"
                  value={it.percent}
                  sx={{ height: 8, borderRadius: 99 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {it.percent}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
