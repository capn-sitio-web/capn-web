import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmCleanDialog({
  open,
  loading = false,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800 }}>
        Limpiar visitas antiguas
      </DialogTitle>

      <DialogContent>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Se eliminarán permanentemente las visitas registradas hace más de 30
          días.
        </Typography>

        <Alert severity="warning" variant="outlined">
          Esta acción ayudará a mantener liviana la tabla de analítica del sitio.
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ textTransform: "none" }}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={loading}
          sx={{ textTransform: "none" }}
        >
          {loading ? "Limpiando..." : "Sí, eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
