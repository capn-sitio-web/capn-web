import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Alert, Box } from "@mui/material";
import axios from "axios";
import SectionCardsEditor from "../../../../components/sectionCardsIcon/SectionCardsEditor";
import type { AccreditationQualitySystem } from "../../domain/accreditation.types";
import { validateSectionCards, type SectionCardsFormErrors } from "../../../../components/sectionCardsIcon/sectionCards.validation";
import { hasAccreditationQualitySystemChanges } from "../../domain/accreditationChangeDetection";

export type QualitySystemTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: AccreditationQualitySystem;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: AccreditationQualitySystem) => Promise<void>;
};

const QualitySystemTab = forwardRef<QualitySystemTabHandle, Props>(
  function QualitySystemTab({ initialValue, onChanges, onCommitSave }, ref) {
    const [data, setData] = useState<AccreditationQualitySystem>(initialValue);
    const [errors, setErrors] = useState<SectionCardsFormErrors>({});
    const [saveError, setSaveError] = useState("");

    useEffect(() => {
      setData(initialValue);
      setErrors({});
      setSaveError("");
    }, [initialValue]);

    const changes = useMemo(
      () => hasAccreditationQualitySystemChanges(data, initialValue),
      [data, initialValue]
    );

    useEffect(() => {
      onChanges(changes);
    }, [changes, onChanges]);

    const handleChange = (nextValue: AccreditationQualitySystem) => {
      setData(nextValue);
      if (saveError || Object.keys(errors).length > 0) {
        const validation = validateSectionCards(nextValue);
        if (validation.success) {
          setErrors({});
          setSaveError("");
          return;
        }
        setErrors(validation.errors);
      }
    };

    const validateAndCommit = async (): Promise<boolean> => {
      const validation = validateSectionCards(data);
      if (!validation.success) {
        setErrors(validation.errors);
        setSaveError("Revisa los campos obligatorios antes de guardar.");
        return false;
      }

      try {
        setErrors({});
        setSaveError("");
        const nextSaved: AccreditationQualitySystem = {
          ...data,
          sectionTitle: validation.data.sectionTitle,
          sectionDescription: validation.data.sectionDescription ?? "",
          cards: validation.data.cards,
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

        <SectionCardsEditor
          value={data}
          onChange={(nextValue) =>
            handleChange({
              ...data,
              ...nextValue,
            })
          }
          errors={errors}
          cardsTitle="Etapas"
          addButtonLabel="Agregar"
        />
      </Box>
    );
  }
);

export default QualitySystemTab;
