import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Alert, Box, Button } from "@mui/material";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import axios from "axios";
import SectionListImageEditor from "../../../../components/sectionListImage/SectionListImageEditor";
import type { ServiceAnalysisDetail, ServiceSensory } from "../../domain/services.types";
import { validateSectionListImage, type SectionListImageFormErrors } from "../../../../components/sectionListImage/sectionListImage.validation";
import { hasServiceSensoryChanges } from "../../domain/servicesChangeDetection";
import AnalysisDetailDialog from "./AnalysisDetailDialog";

export type SensoryTabHandle = {
  submit: () => Promise<boolean>;
};

type Props = {
  initialValue: ServiceSensory;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ServiceSensory) => Promise<void>;
};

const SensoryTab = forwardRef<SensoryTabHandle, Props>(
  function SensoryTab({ initialValue, onChanges, onCommitSave }, ref) {
    const [data, setData] = useState<ServiceSensory>(initialValue);
    const [errors, setErrors] = useState<SectionListImageFormErrors>({});
    const [saveError, setSaveError] = useState("");
    const [detailOpen, setDetailOpen] = useState(false);

    useEffect(() => {
      setData(initialValue);
      setErrors({});
      setSaveError("");
    }, [initialValue]);

    const changes = useMemo(
      () => hasServiceSensoryChanges(data, initialValue),
      [data, initialValue]
    );

    useEffect(() => {
      onChanges(changes);
    }, [changes, onChanges]);

    const handleChange = (nextValue: ServiceSensory) => {
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

    const commitData = async (nextData: ServiceSensory): Promise<boolean> => {
      const validation = validateSectionListImage(nextData);

      if (!validation.success) {
        setErrors(validation.errors);
        setSaveError("Revisa los campos obligatorios antes de guardar.");
        return false;
      }

      try {
        setErrors({});
        setSaveError("");

        const nextSaved: ServiceSensory = {
          ...nextData,
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

    const validateAndCommit = async (): Promise<boolean> => {
      return commitData(data);
    };

    const handleSaveDetail = async (nextDetail: ServiceAnalysisDetail) => {
      const nextData: ServiceSensory = {
        ...data,
        extendedContent: nextDetail.extendedContent,
        galleryImages: nextDetail.galleryImages,
        galleryImagesToDelete: nextDetail.galleryImagesToDelete ?? [],
      };
      const savedOk = await commitData(nextData);
      if (!savedOk) {
        throw new Error("No se pudo guardar el detalle.");
      }
      setData({
        ...nextData,
        galleryImagesToDelete: [],
      });
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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<ArticleOutlinedIcon />}
            onClick={() => setDetailOpen(true)}
          >
            Editar detalle
          </Button>
        </Box>

        <SectionListImageEditor
          value={data}
          onChange={(nextValue) =>
            handleChange({
              ...data,
              ...nextValue,
            })
          }
          errors={errors}
          itemsTitle="Tipos de análisis sensoriales"
          imageLabel="Imagen de análisis sensorial"
        />

        <AnalysisDetailDialog
          open={detailOpen}
          title="Detalle de análisis sensorial"
          initialValue={{
            extendedContent: data.extendedContent,
            galleryImages: data.galleryImages,
            galleryImagesToDelete: data.galleryImagesToDelete ?? [],
          }}
          onClose={() => setDetailOpen(false)}
          onSave={handleSaveDetail}
        />
      </Box>
    );
  }
);

export default SensoryTab;
