import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Alert, Box } from "@mui/material";
import axios from "axios";
import SectionBannerEditor from "./SectionBannerEditor";
import type { SectionBannerData } from "./sectionBanner.types";
import { validateSectionBanner, type SectionBannerErrors } from "./sectionBanner.validation";

export type SectionBannerTabHandle = {
  submit: () => Promise<boolean>;
};

type Props<T extends SectionBannerData> = {
  initialValue: T;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: T) => Promise<void>;
  hasChanges: (current: T, saved: T) => boolean;
  imageLabel?: string;
};

const SectionBannerTab = forwardRef(function SectionBannerTab<
  T extends SectionBannerData
>(
  { initialValue, onChanges, onCommitSave, hasChanges, imageLabel }: Props<T>,
  ref: React.Ref<SectionBannerTabHandle>
) {
  const [data, setData] = useState<T>(initialValue);
  const [errors, setErrors] = useState<SectionBannerErrors>({});
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setData(initialValue);
    setErrors({});
    setSaveError("");
  }, [initialValue]);

  const changes = useMemo(
    () => hasChanges(data, initialValue),
    [data, initialValue, hasChanges]
  );

  useEffect(() => {
    onChanges(changes);
  }, [changes, onChanges]);

  const handleChange = (nextValue: SectionBannerData) => {
    const nextData = {
      ...data,
      ...nextValue,
    } as T;

    setData(nextData);

    if (saveError || Object.keys(errors).length > 0) {
      const validation = validateSectionBanner(nextData);

      if (validation.success) {
        setErrors({});
        setSaveError("");
        return;
      }

      setErrors(validation.errors);
    }
  };

  const validateAndCommit = async (): Promise<boolean> => {
    const validation = validateSectionBanner(data);

    if (!validation.success) {
      setErrors(validation.errors);
      setSaveError("Revisa los campos obligatorios antes de guardar.");
      return false;
    }

    try {
      setErrors({});
      setSaveError("");

      const nextSaved = {
        ...data,
        sectionTitle: validation.data.sectionTitle,
        description: validation.data.description,
        image: validation.data.image,
      } as T;

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

      <SectionBannerEditor
        value={data}
        onChange={handleChange}
        errors={errors}
        imageLabel={imageLabel}
      />
    </Box>
  );
});

export default SectionBannerTab;
