import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Add, DeleteOutline } from "@mui/icons-material";
import ImageUploadField from "../ImageUploadField";
import type { SectionListImageData, SectionListItem } from "./sectionListImage.types";
import type { SectionListImageFormErrors } from "./sectionListImage.validation";

type Props = {
  value: SectionListImageData;
  onChange: (value: SectionListImageData) => void;
  errors?: SectionListImageFormErrors;
  itemsTitle?: string;
  imageLabel?: string;
};

function createEmptyItem(): SectionListItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text: "",
  };
}

export default function SectionListImageEditor({
  value,
  onChange,
  errors,
  itemsTitle = "Lista",
  imageLabel = "Imagen de la sección",
}: Props) {
  const updateSectionField = (
    field: "sectionTitle" | "sectionDescription",
    fieldValue: string
  ) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const updateItem = (itemId: string, text: string) => {
    const updatedItems = value.items.map((item) =>
      item.id === itemId ? { ...item, text } : item
    );

    onChange({
      ...value,
      items: updatedItems,
    });
  };

  const addItem = () => {
    onChange({
      ...value,
      items: [...value.items, createEmptyItem()],
    });
  };

  const deleteItem = (itemId: string) => {
    if (value.items.length === 1) return;

    onChange({
      ...value,
      items: value.items.filter((item) => item.id !== itemId),
    });
  };

  return (
    <Stack spacing={3}>
      <Stack>
        <Typography fontWeight={700} mb={1}>Título de la Sección</Typography>
        <TextField
          fullWidth
          multiline
          value={value.sectionTitle}
          onChange={(event) => updateSectionField("sectionTitle", event.target.value)}
          error={Boolean(errors?.sectionTitle)}
          helperText={errors?.sectionTitle}
        />
      </Stack>

      <Stack>
        <Typography fontWeight={700} mb={1}>Descripción de la sección</Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={value.sectionDescription ?? ""}
          onChange={(event) => updateSectionField("sectionDescription", event.target.value)}
          error={Boolean(errors?.sectionDescription)}
          helperText={errors?.sectionDescription}
        />
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        <Card variant="outlined" sx={{ borderRadius: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Typography fontWeight={700}>{itemsTitle}</Typography>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addItem}
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Agregar
              </Button>
            </Box>

            <Stack spacing={2}>
              {value.items.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: 1,
                    alignItems: "flex-start",
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    label={`Punto ${index + 1}`}
                    value={item.text}
                    onChange={(event) => updateItem(item.id, event.target.value)}
                    error={Boolean(errors?.items?.[index]?.text)}
                    helperText={errors?.items?.[index]?.text}
                  />
                  <IconButton
                    color="error"
                    onClick={() => deleteItem(item.id)}
                    disabled={value.items.length === 1}
                    sx={{ mt: 0.5 }}
                  >
                    <DeleteOutline />
                  </IconButton>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        <ImageUploadField
          label={imageLabel}
          value={{
            file: value.image.file,
            previewUrl: value.image.previewUrl,
          }}
          onChange={(nextImage) =>
            onChange({
              ...value,
              image: {
                ...value.image,
                file: nextImage.file,
                previewUrl: nextImage.previewUrl,
              },
            })
          }
          error={Boolean(errors?.image)}
          helperText={errors?.image}
        />
      </Box>
    </Stack>
  );
}
