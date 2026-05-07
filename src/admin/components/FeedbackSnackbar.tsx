import { Alert, Snackbar } from "@mui/material";

export type FeedbackSeverity = "success" | "warning" | "error" | "info";

export type FeedbackState = {
  message: string;
  severity: FeedbackSeverity;
};

type FeedbackSnackbarProps = {
  feedback: FeedbackState | null;
  open: boolean;
  onClose: () => void;
  onExited: () => void;
  autoHideDuration?: number;
};

export default function FeedbackSnackbar({
  feedback,
  open,
  onClose,
  onExited,
  autoHideDuration = 3000,
}: FeedbackSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        onClose();
      }}
      TransitionProps={{
        onExited,
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={feedback?.severity ?? "info"}
        variant="filled"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {feedback?.message}
      </Alert>
    </Snackbar>
  );
}
