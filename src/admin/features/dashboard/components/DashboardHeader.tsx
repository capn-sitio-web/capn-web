import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import type { DashboardRange } from "../services/dashboard.types";

type Props = {
  range: DashboardRange;
  onChangeRange: (value: DashboardRange) => void;
  onCleanOldVisits: () => void;
  isCleaning?: boolean;
};

export default function DashboardHeader({
  range,
  onChangeRange,
  onCleanOldVisits,
  isCleaning = false,
}: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
        mb: 3,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography color="text.primary" variant="h5" fontWeight={800}>
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Resumen de actividad del sitio web CAPN
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          flexDirection: { xs: "column", sm: "row" },
          width: { xs: "100%", sm: "auto" },
        }}
      >
        <Button
          variant="outlined"
          color="error"
          onClick={onCleanOldVisits}
          disabled={isCleaning}
          sx={{
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          {isCleaning ? "Limpiando..." : "Limpiar visitas antiguas"}
        </Button>

        <Select
          size="small"
          value={range}
          onChange={(e) => onChangeRange(e.target.value as DashboardRange)}
          sx={{ minWidth: { xs: "100%", sm: 150 } }}
        >
          <MenuItem value="7d">Últimos 7 días</MenuItem>
          <MenuItem value="14d">Últimos 14 días</MenuItem>
          <MenuItem value="30d">Últimos 30 días</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
