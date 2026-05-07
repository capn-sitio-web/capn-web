import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { Alert, Box } from "@mui/material";

import SectionCardsEditor from "../../../../components/sectionCardsIcon/SectionCardsEditor";

import type { Values } from "../../domain/about.types";

import {
  validateSectionCards,
  type SectionCardsFormErrors,
} from "../../../../components/sectionCardsIcon/sectionCards.validation";

import { hasValuesChanges } from "../../domain/aboutChangeDetection";

export interface ValuesTabHandle {
  submit: () => Promise<boolean>;
}

interface ValuesTabProps {
  initialValue: Values;
  onChanges: (hasChanges: boolean) => void;
  onCommitSave: (nextSaved: Values) => Promise<void>;
}

const ValuesTab = forwardRef<ValuesTabHandle, ValuesTabProps>(
  ({ initialValue, onChanges, onCommitSave }, ref) => {
    const [form, setForm] = useState<Values>(initialValue);
    const [errors, setErrors] = useState<SectionCardsFormErrors>({});
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      setForm(initialValue);
      setErrors({});
      setErrorMessage("");
      onChanges(false);
    }, [initialValue, onChanges]);

    useEffect(() => {
      onChanges(hasValuesChanges(form, initialValue));
    }, [form, initialValue, onChanges]);

    useImperativeHandle(ref, () => ({
      submit: async () => {
        setErrorMessage("");
        const validation = validateSectionCards(form);
        if (!validation.success) {
          setErrors(validation.errors);
          setErrorMessage("Revisa los campos obligatorios antes de guardar.");
          return false;
        }
        setErrors({});
        const nextSaved: Values = {
          ...form,
          sectionTitle: validation.data.sectionTitle,
          sectionDescription: validation.data.sectionDescription ?? "",
          cards: validation.data.cards,
        };
        await onCommitSave(nextSaved);
        return true;
      },
    }));

    const handleChange = (nextValue: Values) => {
      setForm(nextValue);
      if (errorMessage) {
        const validation = validateSectionCards(nextValue);
        if (validation.success) {
          setErrors({});
          setErrorMessage("");
          return;
        }
        setErrors(validation.errors);
      }
    };

    return (
      <Box>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <SectionCardsEditor
          value={form}
          onChange={(nextValue) =>
            handleChange({
              ...form,
              ...nextValue,
            })
          }
          errors={errors}
          cardsTitle="Valores"
          addButtonLabel="Agregar valor"
        />
      </Box>
    );
  }
);

ValuesTab.displayName = "ValuesTab";

export default ValuesTab;
