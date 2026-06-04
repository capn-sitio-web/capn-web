import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutline, ImageOutlined, UploadRounded } from "@mui/icons-material";
import ImageUploadField from "../../../../components/ImageUploadField";
import type {
  NewsCategory,
  NewsGalleryImage,
  NewsPostForm,
} from "../../domain/news.types";
import {
  validateNewsPostForm,
  type NewsPostFormErrors,
} from "../../domain/news.validation";

type Props = {
  open: boolean;
  form: NewsPostForm | null;
  categories: NewsCategory[];
  saveError: string;
  onClose: () => void;
  onChangeForm: (nextForm: NewsPostForm) => void;
  onChangeSaveError: (message: string) => void;
  onSave: (validForm: NewsPostForm) => Promise<void>;
};

const NewsPostFormDialog = ({
  open,
  form,
  categories,
  saveError,
  onClose,
  onChangeForm,
  onChangeSaveError,
  onSave,
}: Props) => {
  const [formErrors, setFormErrors] = useState<NewsPostFormErrors>({});
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  const updateForm = <K extends keyof NewsPostForm>(
    field: K,
    value: NewsPostForm[K]
  ) => {
    if (!form) return;

    onChangeForm({
      ...form,
      [field]: value,
    });

    setFormErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));

    onChangeSaveError("");
  };

  const updateCoverImage = (next: { file: File | null; previewUrl: string }) => {
    if (!form) return;

    onChangeForm({
      ...form,
      coverImage: {
        ...form.coverImage,
        file: next.file,
        previewUrl: next.previewUrl,
      },
    });

    setFormErrors((prev) => ({
      ...prev,
      coverImage: undefined,
    }));

    onChangeSaveError("");
  };

  const updateCategory = (categoryId: number) => {
    if (!form) return;

    const selectedCategory = categories.find(
      (category) => category.id === categoryId
    );

    onChangeForm({
      ...form,
      categoryId,
      categoryName: selectedCategory?.name ?? "",
    });

    setFormErrors((prev) => ({
      ...prev,
      categoryId: undefined,
    }));

    onChangeSaveError("");
  };

  const handlePickGalleryImages = () => {
    galleryInputRef.current?.click();
  };

  const handleGalleryFilesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!form) return;

    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    event.target.value = "";

    const currentLength = form.galleryImages.length;

    const nextImages: NewsGalleryImage[] = files.map((file, index) => ({
      id: crypto.randomUUID(),
      imageId: null,
      file,
      previewUrl: "",
      alt: "",
      order: currentLength + index + 1,
    }));

    onChangeForm({
      ...form,
      galleryImages: [...form.galleryImages, ...nextImages],
    });

    onChangeSaveError("");
  };

  const removeGalleryImage = (imageId: string) => {
    if (!form) return;

    onChangeForm({
      ...form,
      galleryImages: form.galleryImages.filter((image) => image.id !== imageId),
    });

    onChangeSaveError("");
  };

  const handleClose = () => {
    setFormErrors({});
    onChangeSaveError("");
    onClose();
  };

  const handleSave = async () => {
    if (!form) return;

    const validation = validateNewsPostForm(form);

    if (!validation.success) {
      setFormErrors(validation.errors);
      onChangeSaveError("Revisa los campos obligatorios antes de guardar.");
      return;
    }

    setFormErrors({});
    onChangeSaveError("");

    await onSave(form);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        {form?.noticiaId ? "Editar noticia" : "Crear noticia"}
      </DialogTitle>

      <DialogContent
        dividers
        /* estilos del SCROLL */
        sx={{
          px: 3,
          py: 3,
          maxHeight: "calc(100vh - 180px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.22)",
            borderRadius: "999px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.34)",
          },
        }}
      >
        {saveError ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {saveError}
          </Alert>
        ) : null}

        {form ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2.5}>
                <Typography fontWeight={700}>Información principal</Typography>

                <TextField
                  fullWidth
                  label="Título de la noticia"
                  placeholder="Escribe el título de la noticia..."
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  error={Boolean(formErrors.title)}
                  helperText={formErrors.title}
                />

                <TextField
                  fullWidth
                  label="Contenido completo"
                  placeholder="Escribe el contenido completo de la noticia..."
                  multiline
                  minRows={12}
                  maxRows={12}
                  value={form.content}
                  onChange={(event) => updateForm("content", event.target.value)}
                  error={Boolean(formErrors.content)}
                  helperText={
                    formErrors.content ||
                    "Puedes escribir texto plano o contenido con formato HTML básico."
                  }
                  sx={{
                    "& .MuiInputBase-root": {
                      alignItems: "flex-start",
                    },
                    "& textarea": {
                      overflowY: "auto !important",

                      "&::-webkit-scrollbar": {
                        width: "6px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgba(0, 0, 0, 0.24)",
                        borderRadius: "999px",
                      },
                      "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.36)",
                      },
                    },
                  }}
                />

                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                      }}
                    >
                      <Box>
                        <Typography fontWeight={700}>
                          Galería de imágenes
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                          Imágenes adicionales para el detalle de la noticia.
                        </Typography>
                      </Box>

                      <Button
                        variant="outlined"
                        startIcon={<UploadRounded />}
                        onClick={handlePickGalleryImages}
                      >
                        Agregar imágenes
                      </Button>

                      <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleGalleryFilesChange}
                      />
                    </Box>

                    {form.galleryImages.length === 0 ? (
                      <Box
                        sx={{
                          border: "1px dashed",
                          borderColor: "divider",
                          borderRadius: 2,
                          py: 5,
                          display: "grid",
                          placeItems: "center",
                          color: "text.secondary",
                        }}
                      >
                        <Stack alignItems="center" spacing={1}>
                          <ImageOutlined />
                          <Typography variant="body2">
                            Aún no se agregaron imágenes.
                          </Typography>
                        </Stack>
                      </Box>
                    ) : (
                      <Grid container spacing={2}>
                        {form.galleryImages.map((image) => (
                          <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <GalleryImageCard
                              image={image}
                              onRemove={() => removeGalleryImage(image.id)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </CardContent>
                </Card>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={2.5}>
                <ImageUploadField
                  label="Imagen de portada"
                  value={{
                    file: form.coverImage.file,
                    previewUrl: form.coverImage.previewUrl,
                  }}
                  onChange={updateCoverImage}
                  error={Boolean(formErrors.coverImage)}
                  helperText={formErrors.coverImage}
                />

                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography fontWeight={700} mb={2}>
                      Publicación
                    </Typography>

                    <Stack spacing={2}>
                      <FormControl fullWidth error={Boolean(formErrors.categoryId)}>
                        <InputLabel>Categoría</InputLabel>
                        <Select
                          label="Categoría"
                          value={form.categoryId ?? ""}
                          onChange={(event) =>
                            updateCategory(Number(event.target.value))
                          }
                        >
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>

                        {formErrors.categoryId ? (
                          <Typography
                            variant="caption"
                            color="error"
                            sx={{ mt: 0.5, ml: 1.5 }}
                          >
                            {formErrors.categoryId}
                          </Typography>
                        ) : null}
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                          label="Estado"
                          value={form.isPublished ? "published" : "unpublished"}
                          onChange={(event) =>
                            updateForm(
                              "isPublished",
                              event.target.value === "published"
                            )
                          }
                        >
                          <MenuItem value="published">Publicado</MenuItem>
                          <MenuItem value="unpublished">No publicado</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Fecha de publicación"
                        type="date"
                        value={form.publicationDate}
                        onChange={(event) =>
                          updateForm("publicationDate", event.target.value)
                        }
                        error={Boolean(formErrors.publicationDate)}
                        helperText={formErrors.publicationDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={form.isFeatured}
                            onChange={(event) =>
                              updateForm("isFeatured", event.target.checked)
                            }
                          />
                        }
                        label="Noticia destacada"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
          </Grid>
        ) : null}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>
          Guardar noticia
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function GalleryImageCard({
  image,
  onRemove,
}: {
  image: NewsGalleryImage;
  onRemove: () => void;
}) {
  const src = image.previewUrl || (image.file ? URL.createObjectURL(image.file) : "");

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: 130,
          bgcolor: "grey.100",
          display: "grid",
          placeItems: "center",
        }}
      >
        {src ? (
          <Box
            component="img"
            src={src}
            alt={image.alt || "Imagen adicional"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <ImageOutlined color="disabled" />
        )}
      </Box>

      <Box sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}>
        <IconButton color="error" size="small" onClick={onRemove}>
          <DeleteOutline fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export default NewsPostFormDialog;
