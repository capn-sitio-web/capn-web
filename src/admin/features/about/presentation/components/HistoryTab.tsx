import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { ZodIssue } from "zod";

import ImageUploadField from "./ImageUploadField";
import type { History, HistoryParagraph } from "../../domain/about.types";
import { aboutHistoryValidation } from "../../domain/aboutHistory.validation";
import { hasHistoryChanges } from "./aboutChangeDetection";

export type HistoryTabHandle = {
  submit: () => boolean; // true si guardó, false si hay errores
};

type Props = {
  initialValue: History;
  onHistoryChange: (changes: boolean) => void;
  onCommitSave: (nextSaved: History) => void;
};

type FieldErrors = {
  sectionTitle?: string;
  paragraphsById: Record<string, string | undefined>;
  // image?: string; // por si luego se valida imagen
};

function createId(prefix = "p") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function emptyErrors(): FieldErrors {
  return { paragraphsById: {} };
}

function mapZodIssuesToErrors(issues: ZodIssue[], data: History): FieldErrors {
  const next: FieldErrors = { paragraphsById: {} };

  for (const issue of issues) {
    const path = issue.path;

    // sectionTitle
    if (path[0] === "sectionTitle") {
      next.sectionTitle = issue.message;
      continue;
    }

    // paragraphs[index].text
    if (path[0] === "paragraphs" && typeof path[1] === "number" && path[2] === "text") {
      const idx = path[1];
      const paragraphId = data.paragraphs[idx]?.id;
      if (paragraphId) next.paragraphsById[paragraphId] = issue.message;
      continue;
    }

    // image (si luego se agrega validación)
    // if (path[0] === "image") next.image = issue.message;
  }

  return next;
}

const HistoryTab = forwardRef<HistoryTabHandle, Props>(function HistoryTab(
  { initialValue, onHistoryChange, onCommitSave },
  ref
) {
  const [data, setData] = useState<History>(initialValue);
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors());

  useEffect(() => {
    setData(initialValue);
    setErrors(emptyErrors());
  }, [initialValue]);

  const changes = useMemo(() => hasHistoryChanges(data, initialValue), [data, initialValue]);

  useEffect(() => {
    onHistoryChange(changes);
  }, [changes, onHistoryChange]);

  const handleTitleChange = (title: string) => {
    setData((prev) => ({ ...prev, sectionTitle: title }));
    setErrors((prev) => ({ ...prev, sectionTitle: undefined }));
  };

  const handleParagraphChange = (id: string, text: string) => {
    setData((prev) => ({
      ...prev,
      paragraphs: prev.paragraphs.map((p) => (p.id === id ? { ...p, text } : p)),
    }));
    setErrors((prev) => ({
      ...prev,
      paragraphsById: { ...prev.paragraphsById, [id]: undefined },
    }));
  };

  const addParagraph = () => {
    const next: HistoryParagraph = { id: createId(), text: "" };
    setData((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, next] }));
  };

  const removeParagraph = (id: string) => {
    setData((prev) => {
      if (prev.paragraphs.length <= 1) return prev;
      return { ...prev, paragraphs: prev.paragraphs.filter((p) => p.id !== id) };
    });

    setErrors((prev) => {
      const copy = { ...prev.paragraphsById };
      delete copy[id];
      return { ...prev, paragraphsById: copy };
    });
  };

  const handleImageChange = (next: { file: File | null; previewUrl: string }) => {
    setData((prev) => ({ ...prev, image: next }));
    // si luego se valida imagen, aquí limpiar errors.image
  };

  const validateAndCommit = (): boolean => {
    const result = aboutHistoryValidation.safeParse(data);

    if (!result.success) {
      setErrors(mapZodIssuesToErrors(result.error.issues, data));
      return false;
    }

    setErrors(emptyErrors());
    onCommitSave(data);
    return true;
  };

  // permite que AboutManagementPage dispare el submit desde el botón "guardar cambios"
  useImperativeHandle(ref, () => ({
    submit: validateAndCommit,
  }));

  return (
    <Stack spacing={2.5}>
      <Stack>
        <Typography fontWeight={700} mb={1}>Título de la Sección</Typography>
        <TextField
          value={data.sectionTitle}
          onChange={(e) => handleTitleChange(e.target.value)}
          fullWidth
          error={Boolean(errors.sectionTitle)}
          helperText={errors.sectionTitle}
        />
      </Stack>

      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography fontWeight={700}>Párrafos</Typography>
          <Button
            variant="outlined"
            startIcon={<AddRoundedIcon />}
            onClick={addParagraph}
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Añadir párrafo
          </Button>
        </Stack>

        <Stack spacing={2}>
          {data.paragraphs.map((p, idx) => (
            <Box key={p.id} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
              <TextField
                label={`Párrafo ${idx + 1}`}
                multiline
                minRows={3}
                value={p.text}
                onChange={(e) => handleParagraphChange(p.id, e.target.value)}
                fullWidth
                error={Boolean(errors.paragraphsById[p.id])}
                helperText={errors.paragraphsById[p.id]}
              />

              <IconButton
                aria-label="Eliminar párrafo"
                onClick={() => removeParagraph(p.id)}
                disabled={data.paragraphs.length <= 1}
                color="error"
                size="small"
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Box>
          ))}
        </Stack>
      </Box>

      <ImageUploadField
        label="Imágen de la sección"
        value={data.image}
        onChange={handleImageChange}
      />
    </Stack>
  );
});

export default HistoryTab;
