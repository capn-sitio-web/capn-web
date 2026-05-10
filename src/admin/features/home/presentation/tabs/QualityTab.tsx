import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Alert, Box } from "@mui/material";
import axios from "axios";
import SectionListImageEditor from "../../../../components/sectionListImage/SectionListImageEditor";
import type { HomeQuality } from "../../domain/home.types";
import { validateSectionListImage, type SectionListImageFormErrors } from "../../../../components/sectionListImage/sectionListImage.validation";
import { hasHomeQualityChanges } from "../../domain/homeChangeDetection";

export type QualityTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: HomeQuality;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: HomeQuality) => Promise<void>;
};

const QualityTab = forwardRef<QualityTabHandle, Props>(function QualityTab(
  { initialValue, onChanges, onCommitSave },
  ref
) {
  const [data, setData] = useState<HomeQuality>(initialValue);
  const [errors, setErrors] = useState<SectionListImageFormErrors>({});
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setData(initialValue);
    setErrors({});
    setSaveError("");
  }, [initialValue]);

  const changes = useMemo(
    () => hasHomeQualityChanges(data, initialValue),
    [data, initialValue]
  );

  useEffect(() => {
    onChanges(changes);
  }, [changes, onChanges]);

  const handleChange = (nextValue: HomeQuality) => {
    setData(nextValue);

    if (saveError || Object.keys(errors).length > 0) {
      const validation = validateSectionListImage(nextValue);

      if (validation.success) {
        setErrors({});
        setSaveError("");
        return;
      }

      setErrors(validation.errors);
    }
  };

  const validateAndCommit = async (): Promise<boolean> => {
    const validation = validateSectionListImage(data);

    if (!validation.success) {
      setErrors(validation.errors);
      setSaveError("Revisa los campos obligatorios antes de guardar.");
      return false;
    }

    try {
      setErrors({});
      setSaveError("");

      const nextSaved: HomeQuality = {
        ...data,
        sectionTitle: validation.data.sectionTitle,
        sectionDescription: validation.data.sectionDescription ?? "",
        items: validation.data.items,
        image: validation.data.image,
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

  return (
    <Box>
      {saveError ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {saveError}
        </Alert>
      ) : null}

      <SectionListImageEditor
        value={data}
        onChange={(nextValue) =>
          handleChange({
            ...data,
            ...nextValue,
          })
        }
        errors={errors}
        itemsTitle="Puntos de calidad"
        imageLabel="Imagen de calidad certificada"
      />
    </Box>
  );
});

export default QualityTab;
