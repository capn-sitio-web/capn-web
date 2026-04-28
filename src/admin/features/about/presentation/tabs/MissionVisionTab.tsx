import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Alert, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import type { ZodIssue } from "zod";

import type { MissionVision } from "../../domain/about.types";
import { aboutMissionVisionValidation } from "../../domain/aboutMissionVision.validation";
import { hasMissionVisionChanges } from "../components/aboutChangeDetection";

export type MissionVisionTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: MissionVision;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: MissionVision) => Promise<void>;
};

type FieldErrors = {
  mission?: string;
  vision?: string;
};

function mapZodIssuesToErrors(issues: ZodIssue[]): FieldErrors {
  const next: FieldErrors = {};

  for (const issue of issues) {
    const path = issue.path;
    if (path[0] === "mission") next.mission = issue.message;
    if (path[0] === "vision") next.vision = issue.message;
  }

  return next;
}

const MissionVisionTab = forwardRef<MissionVisionTabHandle, Props>(function MissionVisionTab(
  { initialValue, onChanges, onCommitSave },
  ref
) {
  const [data, setData] = useState<MissionVision>(initialValue);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setData(initialValue);
    setErrors({});
    setSaveError("");
  }, [initialValue]);

  const changes = useMemo(() => hasMissionVisionChanges(data, initialValue), [data, initialValue]);

  useEffect(() => {
    onChanges(changes);
  }, [changes, onChanges]);

  const onMissionChange = (value: string) => {
    setData((prev) => ({ ...prev, mission: value }));
    setErrors((prev) => ({ ...prev, mission: undefined }));
    setSaveError("");
  };

  const onVisionChange = (value: string) => {
    setData((prev) => ({ ...prev, vision: value }));
    setErrors((prev) => ({ ...prev, vision: undefined }));
    setSaveError("");
  };

  const validateAndCommit = async (): Promise<boolean> => {
    const result = aboutMissionVisionValidation.safeParse({
      mission: data.mission,
      vision: data.vision,
    });

    if (!result.success) {
      setErrors(mapZodIssuesToErrors(result.error.issues));
      return false;
    }

    try {
      setErrors({});
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

  useImperativeHandle(ref, () => ({
    submit: validateAndCommit,
  }));

  return (
    <Stack spacing={2.5}>
      {saveError ? <Alert severity="error">{saveError}</Alert> : null}
      
      <Stack>
        <Typography fontWeight={700} mb={1}>Misión</Typography>
        <TextField
          multiline
          minRows={4}
          value={data.mission}
          onChange={(e) => onMissionChange(e.target.value)}
          fullWidth
          error={Boolean(errors.mission)}
          helperText={errors.mission}
        />
      </Stack>

      <Stack>
        <Typography fontWeight={700} mb={1}>Visión</Typography>
        <TextField
          multiline
          minRows={4}
          value={data.vision}
          onChange={(e) => onVisionChange(e.target.value)}
          fullWidth
          error={Boolean(errors.vision)}
          helperText={errors.vision}
        />
      </Stack>
    </Stack>
  );
});

export default MissionVisionTab;
