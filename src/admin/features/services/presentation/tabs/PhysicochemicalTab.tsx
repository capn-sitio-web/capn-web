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
import type { ServicePhysicochemical } from "../../domain/services.types";
import { validateSectionListImage, type SectionListImageFormErrors } from "../../../../components/sectionListImage/sectionListImage.validation";
import { hasServicePhysicochemicalChanges } from "../../domain/servicesChangeDetection";

export type PhysicochemicalTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: ServicePhysicochemical;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ServicePhysicochemical) => Promise<void>;
};

const PhysicochemicalTab = forwardRef<PhysicochemicalTabHandle, Props>(
  function PhysicochemicalTab({ initialValue, onChanges, onCommitSave }, ref) {
    const [data, setData] = useState<ServicePhysicochemical>(initialValue);
    const [errors, setErrors] = useState<SectionListImageFormErrors>({});
    const [saveError, setSaveError] = useState("");

    useEffect(() => {
      setData(initialValue);
      setErrors({});
      setSaveError("");
    }, [initialValue]);

    const changes = useMemo(
      () => hasServicePhysicochemicalChanges(data, initialValue),
      [data, initialValue]
    );

    useEffect(() => {
      onChanges(changes);
    }, [changes, onChanges]);

    const handleChange = (nextValue: ServicePhysicochemical) => {
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

        const nextSaved: ServicePhysicochemical = {
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
          itemsTitle="Tipos de análisis fisicoquímicos"
          imageLabel="Imagen de análisis fisicoquímico"
        />
      </Box>
    );
  }
);

export default PhysicochemicalTab;
