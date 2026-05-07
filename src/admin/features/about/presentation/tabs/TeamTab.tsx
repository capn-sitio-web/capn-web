import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Add, DeleteOutline } from "@mui/icons-material";

import axios from "axios";
import type { ZodIssue } from "zod";

import ImageUploadField from "../components/ImageUploadField";
import type { Team, TeamMember } from "../../domain/about.types";
import { aboutTeamValidation } from "../../domain/aboutTeam.validation";
import { hasTeamChanges } from "../../domain/aboutChangeDetection";

export type TeamTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: Team;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: Team) => Promise<void>;
};

type TeamFormErrors = {
  sectionTitle?: string;
  sectionDescription?: string;
  members?: {
    image?: string;
    name?: string;
    position?: string;
    description?: string;
  }[];
};

function createEmptyMember(): TeamMember {
  return {
    id: crypto.randomUUID(),
    personalId: null,
    image: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "",
    },
    name: "",
    position: "",
    description: "",
  };
}

function mapZodIssuesToErrors(issues: ZodIssue[]): TeamFormErrors {
  const errors: TeamFormErrors = {};
  for (const issue of issues) {
    const [field, index, memberField] = issue.path;
    if (field === "sectionTitle") {
      errors.sectionTitle = issue.message;
    }
    if (field === "sectionDescription") {
      errors.sectionDescription = issue.message;
    }
    if (field === "members" && typeof index === "number") {
      if (!errors.members) errors.members = [];
      if (!errors.members[index]) errors.members[index] = {};
      if (memberField === "image") {
        errors.members[index].image = issue.message;
      }
      if (memberField === "name") {
        errors.members[index].name = issue.message;
      }
      if (memberField === "position") {
        errors.members[index].position = issue.message;
      }
      if (memberField === "description") {
        errors.members[index].description = issue.message;
      }
    }
  }
  return errors;
}

const TeamTab = forwardRef<TeamTabHandle, Props>(function TeamTab(
  { initialValue, onChanges, onCommitSave },
  ref
) {
  const [data, setData] = useState<Team>(initialValue);
  const [errors, setErrors] = useState<TeamFormErrors>({});
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setData(initialValue);
    setErrors({});
    setSaveError("");
  }, [initialValue]);

  const changes = useMemo(
    () => hasTeamChanges(data, initialValue),
    [data, initialValue]
  );

  useEffect(() => {
    onChanges(changes);
  }, [changes, onChanges]);

  const handleChange = (nextData: Team) => {
    setData(nextData);
    if (saveError || Object.keys(errors).length > 0) {
      const result = aboutTeamValidation.safeParse(nextData);
      if (result.success) {
        setErrors({});
        setSaveError("");
        return;
      }
      setErrors(mapZodIssuesToErrors(result.error.issues));
    }
  };

  const updateSectionField = (
    field: "sectionTitle" | "sectionDescription",
    value: string
  ) => {
    handleChange({
      ...data,
      [field]: value,
    });
  };

  const updateMemberField = (
    memberId: string,
    field: "name" | "position" | "description",
    value: string
  ) => {
    const updatedMembers = data.members.map((member) =>
      member.id === memberId
        ? {
            ...member,
            [field]: value,
          }
        : member
    );
    handleChange({
      ...data,
      members: updatedMembers,
    });
  };

  const updateMemberImage = (
    memberId: string,
    image: { file: File | null; previewUrl: string }
  ) => {
    const updatedMembers = data.members.map((member) =>
      member.id === memberId
        ? {
            ...member,
            image: {
              ...member.image,
              file: image.file,
              previewUrl: image.previewUrl,
            },
          }
        : member
    );
    handleChange({
      ...data,
      members: updatedMembers,
    });
  };

  const addMember = () => {
    handleChange({
      ...data,
      members: [...data.members, createEmptyMember()],
    });
  };

  const deleteMember = (memberId: string) => {
    if (data.members.length === 1) return;
    handleChange({
      ...data,
      members: data.members.filter((member) => member.id !== memberId),
    });
  };

  const validateAndCommit = async (): Promise<boolean> => {
    const result = aboutTeamValidation.safeParse(data);
    if (!result.success) {
      setErrors(mapZodIssuesToErrors(result.error.issues));
      setSaveError("Revisa los campos obligatorios antes de guardar.");
      return false;
    }
    try {
      setErrors({});
      setSaveError("");
      await onCommitSave({
        ...data,
        ...result.data,
        sectionDescription: result.data.sectionDescription ?? "",
      });
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
    <Stack spacing={3}>
      {saveError ? <Alert severity="error">{saveError}</Alert> : null}
      <Stack>
        <Typography fontWeight={700} mb={1}>Título de la Sección</Typography>
        <TextField
          fullWidth
          value={data.sectionTitle}
          onChange={(event) => updateSectionField("sectionTitle", event.target.value)}
          error={Boolean(errors.sectionTitle)}
          helperText={errors.sectionTitle}
        />
      </Stack>

      <Stack>
        <Typography fontWeight={700} mb={1}>Descripción de la sección</Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={data.sectionDescription}
          onChange={(event) => updateSectionField("sectionDescription", event.target.value)}
          error={Boolean(errors.sectionDescription)}
          helperText={errors.sectionDescription}
        />
      </Stack>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography fontWeight={700}>Integrantes</Typography>
        <Button variant="outlined" startIcon={<Add />} onClick={addMember} sx={{ textTransform: "none", borderRadius: 2 }}>
          Agregar integrante
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {data.members.map((member, index) => (
          <Card key={member.id} variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip title="Eliminar integrante">
                  <IconButton
                    color="error"
                    onClick={() => deleteMember(member.id)}
                    disabled={data.members.length === 1}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Tooltip>
              </Box>

              <TextField
                fullWidth
                label="Nombre"
                value={member.name}
                onChange={(event) => updateMemberField(member.id, "name", event.target.value)}
                error={Boolean(errors.members?.[index]?.name)}
                helperText={errors.members?.[index]?.name}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                label="Cargo"
                value={member.position}
                onChange={(event) => updateMemberField(member.id, "position", event.target.value)}
                error={Boolean(errors.members?.[index]?.position)}
                helperText={errors.members?.[index]?.position}
                sx={{ mt: 2 }}
              />

              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Descripción"
                value={member.description}
                onChange={(event) =>
                  updateMemberField(
                    member.id,
                    "description",
                    event.target.value
                  )
                }
                error={Boolean(errors.members?.[index]?.description)}
                helperText={errors.members?.[index]?.description}
                sx={{ mt: 2 }}
              />

              <ImageUploadField
                label=""
                value={{
                  file: member.image.file,
                  previewUrl: member.image.previewUrl,
                }}
                onChange={(nextImage) => updateMemberImage(member.id, nextImage)}
                error={Boolean(errors.members?.[index]?.image)}
                helperText={errors.members?.[index]?.image}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Stack>
  );
});

export default TeamTab;
