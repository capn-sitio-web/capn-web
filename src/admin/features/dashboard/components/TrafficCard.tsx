import { Card, CardContent, Typography, Box } from "@mui/material";

export default function TrafficCard() {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, height: "100%" }}>
      <CardContent>
        <Typography fontWeight={700}>Tráfico del Sitio</Typography>

        <Box
          sx={{
            mt: 2,
            height: 220,
            borderRadius: 3,
            bgcolor: "action.hover",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography color="text.secondary">Gráfico de tráfico</Typography>
            <Typography variant="caption" color="text.secondary">
              Datos de los últimos 7 días
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
