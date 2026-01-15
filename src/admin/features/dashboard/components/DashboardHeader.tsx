import { Box, MenuItem, Select, Typography } from "@mui/material";

type Props = {
  range: "7d" | "30d" | "90d";
  onChangeRange: (value: "7d" | "30d" | "90d") => void;
};

export default function DashboardHeader({ range, onChangeRange }: Props) {
  return (
    <Box sx={{ 
      display: "flex",
      alignItems: "flex-start",
      flexDirection: { xs: "column", sm: "row" },
      gap: 2,
      mb: 3,
    }}>
      <Box sx={{ flex: 1 }}>
        <Typography color="text.primary" variant="h5" fontWeight={800}>
          Dashboard
        </Typography>
        <Typography color="text.secondary">
          Resumen de actividad del sitio web CAPN
        </Typography>
      </Box>
      <Select
        size="small"
        value={range}
        onChange={(e) => onChangeRange(e.target.value as Props["range"])}
        sx={{ minWidth: { xs: "100%", sm: 150 } }}
      >
        <MenuItem value="7d">Últimos 7 días</MenuItem>
        <MenuItem value="30d">Últimos 30 días</MenuItem>
        <MenuItem value="90d">Últimos 90 días</MenuItem>
      </Select>
    </Box>
  );
}
