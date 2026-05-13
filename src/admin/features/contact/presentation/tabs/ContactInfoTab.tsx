import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import type { ZodIssue } from "zod";
import type { ContactInfo } from "../../domain/contact.types";
import { contactInfoValidation } from "../../domain/contactInfo.validation";
import { hasContactInfoChanges } from "../../domain/contactChangeDetection";

export type ContactInfoTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: ContactInfo;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ContactInfo) => Promise<void>;
};

type ContactInfoErrors = {
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  mapEmbedUrl?: string;
  facebookUrl?: string;
};

function mapZodIssuesToErrors(issues: ZodIssue[]): ContactInfoErrors {
  const errors: ContactInfoErrors = {};
  for (const issue of issues) {
    const field = issue.path[0];
    if (field === "address") errors.address = issue.message;
    if (field === "phone") errors.phone = issue.message;
    if (field === "email") errors.email = issue.message;
    if (field === "facebookUrl") errors.facebookUrl = issue.message;
    if (field === "mapEmbedUrl") errors.mapEmbedUrl = issue.message;
  }
  return errors;
}

function extractMapSrc(value: string): string {
  const trimmed = value.trim();
  const srcMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (srcMatch?.[1]) {
    return srcMatch[1];
  }
  return trimmed;
}

const ContactInfoTab = forwardRef<ContactInfoTabHandle, Props>(
  function ContactInfoTab({ initialValue, onChanges, onCommitSave }, ref) {
    const [data, setData] = useState<ContactInfo>(initialValue);
    const [errors, setErrors] = useState<ContactInfoErrors>({});
    const [saveError, setSaveError] = useState("");

    useEffect(() => {
      setData(initialValue);
      setErrors({});
      setSaveError("");
    }, [initialValue]);

    const changes = useMemo(
      () => hasContactInfoChanges(data, initialValue),
      [data, initialValue]
    );

    useEffect(() => {
      onChanges(changes);
    }, [changes, onChanges]);

    const handleChange = (field: keyof ContactInfo, value: string) => {
      const nextData = {
        ...data,
        [field]: value,
      };
      setData(nextData);
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
      setSaveError("");
    };

    const validateAndCommit = async (): Promise<boolean> => {
      const result = contactInfoValidation.safeParse(data);
      if (!result.success) {
        setErrors(mapZodIssuesToErrors(result.error.issues));
        setSaveError("Revisa los campos obligatorios antes de guardar.");
        return false;
      }
      try {
        setErrors({});
        setSaveError("");
        const nextSaved: ContactInfo = {
          ...data,
          ...result.data,
          facebookUrl: result.data.facebookUrl ?? "",
        };
        await onCommitSave(nextSaved);
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

    const mapSrc = extractMapSrc(data.mapEmbedUrl);

    return (
      <Stack spacing={3}>
        {saveError ? <Alert severity="error">{saveError}</Alert> : null}

        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={700} mb={2}>Información Básica</Typography>
            <Stack spacing={2}>
              <TextField
                label="Dirección"
                fullWidth
                multiline
                minRows={2}
                value={data.address}
                onChange={(event) => handleChange("address", event.target.value)}
                error={Boolean(errors.address)}
                helperText={errors.address}
              />
              <TextField
                label="Teléfono"
                fullWidth
                value={data.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
              <TextField
                label="Email"
                fullWidth
                value={data.email}
                onChange={(event) => handleChange("email", event.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <TextField
                label="Facebook"
                fullWidth
                value={data.facebookUrl}
                onChange={(event) => handleChange("facebookUrl", event.target.value)}
                error={Boolean(errors.facebookUrl)}
                helperText={errors.facebookUrl}
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography fontWeight={700} mb={2}>Configuración del Mapa</Typography>
            <TextField
              label="URL o iframe del Mapa de Google Maps"
              fullWidth
              multiline
              minRows={2}
              value={data.mapEmbedUrl}
              onChange={(event) => handleChange("mapEmbedUrl", event.target.value)}
              error={Boolean(errors.mapEmbedUrl)}
              helperText={errors.mapEmbedUrl}
            />

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" fontWeight={700} mb={1}>Vista previa del mapa</Typography>
              {mapSrc ? (
                <Box
                  component="iframe"
                  src={mapSrc}
                  sx={{
                    width: "100%",
                    height: 300,
                    border: 0,
                    borderRadius: 2,
                    mb: 4,
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <Box
                  sx={{
                    minHeight: 280,
                    display: "grid",
                    placeItems: "center",
                    color: "text.secondary",
                  }}
                >
                  Aún no se configuró el mapa.
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Stack>
    );
  }
);

export default ContactInfoTab;
