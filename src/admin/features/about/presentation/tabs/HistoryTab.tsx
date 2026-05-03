import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Alert, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import type { ZodIssue } from "zod";

import ImageUploadField from "../components/ImageUploadField";
import type { History } from "../../domain/about.types";
import { aboutHistoryValidation } from "../../domain/aboutHistory.validation";
import { hasHistoryChanges } from "../../domain/aboutChangeDetection";

export type HistoryTabHandle = {
  submit: () => Promise<boolean>; // true si guardó, false si hay errores
};

type Props = {
  initialValue: History;
  onHistoryChange: (changes: boolean) => void;
  onCommitSave: (nextSaved: History) => Promise<void>;
};

type FieldErrors = {
  sectionTitle?: string;
  description?: string;
  image?: string;
};

function emptyErrors(): FieldErrors {
  return {};
}

function mapZodIssuesToErrors(issues: ZodIssue[]): FieldErrors {
  const next: FieldErrors = {};

  for (const issue of issues) {
    const path = issue.path;
    // sectionTitle
    if (path[0] === "sectionTitle") {
      next.sectionTitle = issue.message;
      continue;
    }
    // description
    if (path[0] === "description") {
      next.description = issue.message;
      continue;
    }
    // image
    if (path[0] === "image") {
      next.image = issue.message;
      continue;
    }
  }
  return next;
}

const HistoryTab = forwardRef<HistoryTabHandle, Props>(function HistoryTab(
  { initialValue, onHistoryChange, onCommitSave },
  ref
) {
  const [data, setData] = useState<History>(initialValue);
  const [errors, setErrors] = useState<FieldErrors>(emptyErrors());
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setData(initialValue);
    setErrors(emptyErrors());
    setSaveError("");
  }, [initialValue]);

  const changes = useMemo(() => hasHistoryChanges(data, initialValue), [data, initialValue]);

  useEffect(() => {
    onHistoryChange(changes);
  }, [changes, onHistoryChange]);

  const handleTitleChange = (title: string) => {
    setData((prev) => ({ ...prev, sectionTitle: title }));
    setErrors((prev) => ({ ...prev, sectionTitle: undefined }));
    setSaveError("");
  };

  const handleDescriptionChange = (description: string) => {
    setData((prev) => ({ ...prev, description: description }));
    setErrors((prev) => ({ ...prev, description: undefined }));
    setSaveError("");
  };

  const handleImageChange = (next: { file: File | null; previewUrl: string }) => {
    setData((prev) => ({
      ...prev,
      image: {
        ...prev.image,
        file: next.file,
        previewUrl: next.previewUrl,
      },
    }));
    setErrors((prev) => ({ ...prev, image: undefined }));
    setSaveError("");
  };

  const validateAndCommit = async (): Promise<boolean> => {
    const result = aboutHistoryValidation.safeParse(data);
    if (!result.success) {
      setErrors(mapZodIssuesToErrors(result.error.issues));
      return false;
    }
    /*setErrors(emptyErrors());
    await onCommitSave(data);
    return true;*/
    try {
      setErrors(emptyErrors());
      setSaveError("");
      await onCommitSave(data);
      return true;
    } catch (error: unknown) {
      let message = "No se pudieron guardar los cambios.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      setSaveError(message);
      return false;
    }
  };

  // permite que AboutManagementPage dispare el submit desde el botón "guardar cambios"
  useImperativeHandle(ref, () => ({
    submit: validateAndCommit,
  }));

  return (
    <Stack spacing={2.5}>
      {saveError ? <Alert severity="error">{saveError}</Alert> : null}
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

      <Stack>
        <Typography fontWeight={700} mb={1}>Descripción</Typography>
        <TextField
          value={data.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          fullWidth
          multiline
          minRows={4}
          error={Boolean(errors.description)}
          helperText={errors.description}
        />
      </Stack>

      <ImageUploadField
        label="Imágen de la sección"
        value={data.image}
        onChange={handleImageChange}
        error={Boolean(errors.image)}
        helperText={errors.image}
        /*helperText={
          errors.image ||
          (data.image.file
            ? "La imagen fue seleccionada localmente. La subida al backend se implementará después."
            : undefined)
        }*/
      />
    </Stack>
  );
});

export default HistoryTab;
