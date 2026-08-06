import { useEffect, useRef, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";

import type {
  ServiceAnalysisDetail,
  ServiceDetailImage,
} from "../../domain/services.types";

type Props = {
  open: boolean;
  title: string;
  initialValue: ServiceAnalysisDetail;
  onClose: () => void;
  onSave: (nextDetail: ServiceAnalysisDetail) => Promise<void>;
};

export default function AnalysisDetailDialog({
  open,
  title,
  initialValue,
  onClose,
  onSave,
}: Props) {
  const [data, setData] = useState<ServiceAnalysisDetail>(initialValue);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const editorRef = useRef<HTMLDivElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const wasOpenRef = useRef(false);
  useEffect(() => {
    const isOpening = open && !wasOpenRef.current;
    if (isOpening) {
      setData(initialValue);
      setSaveError("");
      setSaving(false);
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = initialValue.extendedContent ?? "";
        }
      });
    }
    wasOpenRef.current = open;
  }, [open, initialValue]);

  const syncEditorContent = () => {
    setData((prev) => ({
      ...prev,
      extendedContent: editorRef.current?.innerHTML ?? "",
    }));

    setSaveError("");
  };

  const applyCommand = (command: "bold" | "insertUnorderedList") => {
    editorRef.current?.focus();
    document.execCommand(command);
    syncEditorContent();
  };

  const handlePickImages = () => {
    galleryInputRef.current?.click();
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    event.target.value = "";

    const currentLength = data.galleryImages.length;

    const newImages: ServiceDetailImage[] = files.map((file, index) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      imageId: null,
      file,
      previewUrl: "",
      alt: "",
      order: currentLength + index + 1,
    }));

    setData((prev) => ({
      ...prev,
      galleryImages: [...prev.galleryImages, ...newImages],
    }));

    setSaveError("");
  };

  const handleRemoveImage = (image: ServiceDetailImage) => {
    setData((prev) => {
      const nextImages = prev.galleryImages.filter(
        (item) => item.id !== image.id
      );

      const nextImagesToDelete =
        image.imageId !== null
          ? [...(prev.galleryImagesToDelete ?? []), image.imageId]
          : prev.galleryImagesToDelete ?? [];

      return {
        ...prev,
        galleryImages: nextImages,
        galleryImagesToDelete: nextImagesToDelete,
      };
    });

    setSaveError("");
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveError("");

      const nextData: ServiceAnalysisDetail = {
        ...data,
        extendedContent: editorRef.current?.innerHTML ?? "",
      };

      await onSave(nextData);

      setSuccessOpen(true);
      onClose();
    } catch (error) {
      console.error("Error al guardar detalle:", error);
      setSaveError("No se pudo guardar el detalle del análisis.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle>{title}</DialogTitle>

        <DialogContent
          dividers
          sx={{
            px: 3,
            py: 3,
            maxHeight: "calc(100vh - 180px)",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.22)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.34)",
            },
          }}
        >
          {saveError ? (
            <Alert severity="error" sx={{ mb: 3 }}>
              {saveError}
            </Alert>
          ) : null}

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Stack spacing={1.5}>
                <Typography fontWeight={700}>Texto del detalle</Typography>

                <Box
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      bgcolor: "grey.50",
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => applyCommand("bold")}
                    >
                      <FormatBoldIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => applyCommand("insertUnorderedList")}
                    >
                      <FormatListBulletedIcon fontSize="small" />
                    </IconButton>
                  </Stack>

                  <Box
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={syncEditorContent}
                    onPaste={(event) => {
                      event.preventDefault();
                      const text = event.clipboardData.getData("text/plain");
                      const html = event.clipboardData.getData("text/html");
                      if (html) {
                        // Limpiamos estilos, clases, scripts e iframes del HTML copiado
                        const cleanHtml = html
                          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
                          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
                          .replace(/\s+on\w+\s*=\s*(['"])(.*?)\1/gi, "")
                          .replace(/\s+style\s*=\s*(['"])(.*?)\1/gi, "")
                          .replace(/\s+class\s*=\s*(['"])(.*?)\1/gi, "");
                        document.execCommand("insertHTML", false, cleanHtml);
                      } else {
                        document.execCommand("insertText", false, text);
                      }
                      syncEditorContent();
                    }}
                    sx={{
                      minHeight: 430,
                      maxHeight: 430,
                      overflowY: "auto",
                      px: 2,
                      py: 2,
                      fontSize: 16,
                      lineHeight: 1.7,
                      outline: "none",
                      whiteSpace: "pre-wrap",

                      "& ul": {
                        pl: 3,
                        my: 1,
                      },

                      "& li": {
                        mb: 0.5,
                      },

                      "& strong, & b": {
                        fontWeight: 700,
                      },

                      "&:empty:before": {
                        content: '"Escribe el detalle extendido del análisis..."',
                        color: "text.disabled",
                      },

                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0, 0, 0, 0.24)",
                        borderRadius: "999px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.36)",
                      },
                    }}
                  />
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={5}>
              <Card variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography fontWeight={700}>
                          Imágenes del detalle
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Puedes agregar o quitar imágenes del contenido.
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        startIcon={<UploadRoundedIcon />}
                        onClick={handlePickImages}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          px: 2.5,
                        }}
                      >
                        Agregar
                      </Button>

                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleFilesChange}
                      />
                    </Box>

                    {data.galleryImages.length === 0 ? (
                      <Box
                        sx={{
                          border: "1px dashed",
                          borderColor: "divider",
                          borderRadius: 2,
                          py: 6,
                          display: "grid",
                          placeItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <Stack alignItems="center" spacing={1}>
                          <ImageOutlinedIcon />
                          <Typography variant="body2">
                            Aún no se agregaron imágenes.
                          </Typography>
                        </Stack>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {data.galleryImages.map((image) => (
                          <Grid item xs={12} sm={6} key={image.id}>
                            <DetailImageCard
                              image={image}
                              onRemove={() => handleRemoveImage(image)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={onClose}
            disabled={saving}
            sx={{ textTransform: "none", fontWeight: 700 }}
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 3,
            }}
          >
            {saving ? "Guardando..." : "Guardar detalle"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
          sx={{ width: "100%" }}
        >
          El detalle se guardó correctamente.
        </Alert>
      </Snackbar>
    </>
  );
}

function DetailImageCard({
  image,
  onRemove,
}: {
  image: ServiceDetailImage;
  onRemove: () => void;
}) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!image.file) {
      setFileUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(image.file);
    setFileUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image.file]);

  const src = fileUrl || image.previewUrl;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          height: 150,
          bgcolor: "grey.100",
          display: "grid",
          placeItems: "center",
          position: "relative",
        }}
      >
        {src ? (
          <Box
            component="img"
            src={src}
            alt="Imagen de detalle"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <ImageOutlinedIcon color="disabled" />
        )}

        <IconButton
          color="error"
          size="small"
          onClick={onRemove}
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": {
              bgcolor: "background.paper",
            },
          }}
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
