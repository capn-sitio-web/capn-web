import { useEffect, useMemo, useRef } from "react";
import { Box, Button, FormHelperText, Stack, Typography } from "@mui/material";
import UploadRoundedIcon from "@mui/icons-material/UploadRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

type Props = {
  label?: string;
  value: { file: File | null; previewUrl: string };
  onChange: (next: { file: File | null; previewUrl: string }) => void;
  accept?: string;
  error?: boolean;
  helperText?: string;
};

export default function ImageUploadField({
  label = "Imágen",
  value,
  onChange,
  accept = "image/*",
  error = false,
  helperText,
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Si hay file, generamos blob URL; si no, usamos previewUrl existente (cuando haya API)
  const blobUrl = useMemo(() => {
    if (!value.file) return "";
    return URL.createObjectURL(value.file);
  }, [value.file]);

  // limpiar blobUrl cuando cambie
  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const previewToShow = blobUrl || value.previewUrl;

  const handlePick = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    // si se vuelve a seleccionar el mismo archivo, el input no dispara change si no resetea value
    e.target.value = "";

    onChange({ file, previewUrl: "" }); // preview vendrá del blobUrl
  };

  const handleRemove = () => {
    onChange({ file: null, previewUrl: "" });
  };

  return (
    <Stack spacing={1.25}>
      <Typography fontWeight={700}>{label}</Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
        <Button
          variant="outlined"
          startIcon={<UploadRoundedIcon />}
          onClick={handlePick}
          sx={{ textTransform: "none", borderRadius: 2, width: { xs: "100%", sm: "fit-content" } }}
        >
          Subir imagen
        </Button>

        <Button
          color="error"
          startIcon={<DeleteOutlineRoundedIcon />}
          onClick={handleRemove}
          disabled={!value.file && !value.previewUrl}
          sx={{ textTransform: "none", borderRadius: 2, width: { xs: "100%", sm: "fit-content" } }}
        >
          Quitar
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={handleFileChange}
        />
      </Stack>

      <Box>
        <Box
          sx={{
            border: "1px solid",
            borderColor: error ? "error.main" : "divider",
            borderRadius: 2,
            overflow: "hidden",
            minHeight: 160,
            display: "grid",
            placeItems: "center",
          }}
        >
          {previewToShow ? (
            <Box
              component="img"
              src={previewToShow}
              alt="preview"
              sx={{ height: 260, objectFit: "cover" }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              Aún no se subió ninguna imagen.
            </Typography>
          )}
        </Box>
        <Box pl={1.8}>
          {helperText ? (
            <FormHelperText error={error}>{helperText}</FormHelperText>
          ) : null}
        </Box>
      </Box>
    </Stack>
  );
}
