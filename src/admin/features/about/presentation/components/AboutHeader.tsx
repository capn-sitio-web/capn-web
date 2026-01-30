import { Box, Button, Typography } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

type Props = {
  title: string;
  subtitle?: string;
  disableSave?: boolean;
  onSave: () => void;
};

export default function AboutHeader({ title, subtitle, disableSave = true, onSave }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
        mb: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight={800} color="text.primary">
          {title}
        </Typography>
        {subtitle ? (
          <Typography color="text.secondary">{subtitle}</Typography>
        ) : null}
      </Box>
      <Button
        variant="contained"
        disableElevation
        startIcon={<SaveRoundedIcon />}
        disabled={disableSave}
        onClick={onSave}
        sx={{ textTransform: "none", borderRadius: 2 }}
      >
        Guardar Cambios
      </Button>
    </Box>
  );
}
