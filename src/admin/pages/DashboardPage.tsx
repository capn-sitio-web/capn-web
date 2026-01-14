import { Box, Typography } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={800} color="#000">
        Dashboard
      </Typography>
      <Typography color="text.secondary">
        Resumen de actividad del sitio web CAPN
      </Typography>
    </Box>
  );
}
