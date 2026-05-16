import { Stack, TextField, Typography } from "@mui/material";

import ImageUploadField from "../ImageUploadField";

import type { SectionBannerData } from "./sectionBanner.types";
import type { SectionBannerErrors } from "./sectionBanner.validation";

type Props = {
  value: SectionBannerData;
  onChange: (nextValue: SectionBannerData) => void;
  errors?: SectionBannerErrors;
  titleLabel?: string;
  descriptionLabel?: string;
  imageLabel?: string;
};

export default function SectionBannerEditor({
  value,
  onChange,
  errors,
  titleLabel = "Título de la Sección",
  descriptionLabel = "Descripción",
  imageLabel = "Imagen de la sección",
}: Props) {
  return (
    <Stack spacing={2.5}>
      <Stack>
        <Typography fontWeight={700} mb={1}>{titleLabel}</Typography>
        <TextField
          value={value.sectionTitle}
          onChange={(event) =>
            onChange({
              ...value,
              sectionTitle: event.target.value,
            })
          }
          fullWidth
          multiline
          error={Boolean(errors?.sectionTitle)}
          helperText={errors?.sectionTitle}
        />
      </Stack>

      <Stack>
        <Typography fontWeight={700} mb={1}>{descriptionLabel}</Typography>
        <TextField
          value={value.description}
          onChange={(event) =>
            onChange({
              ...value,
              description: event.target.value,
            })
          }
          fullWidth
          multiline
          minRows={2}
          error={Boolean(errors?.description)}
          helperText={errors?.description}
        />
      </Stack>

      <ImageUploadField
        label={imageLabel}
        value={value.image}
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
    </Stack>
  );
}
