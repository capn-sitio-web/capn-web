import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Add, Search, EditOutlined, DeleteOutline, ImageOutlined } from "@mui/icons-material";

import type {
  NewsCategory,
  NewsPost,
  NewsPostForm,
  NewsStatusFilter,
} from "../../domain/news.types";

import { newsPostsService } from "../../data/newsPosts.service";
import type { FeedbackState } from "../../../../components/FeedbackSnackbar";
import NewsPostFormDialog from "./NewsPostFormDialog";

type Props = {
  onFeedback: (feedback: FeedbackState) => void;
};

function todayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function createEmptyPost(categories: NewsCategory[]): NewsPostForm {
  const firstCategory = categories[0];

  return {
    id: crypto.randomUUID(),
    noticiaId: null,
    categoryId: firstCategory?.id ?? null,
    categoryName: firstCategory?.name ?? "",
    title: "",
    content: "",
    coverImage: {
      file: null,
      previewUrl: "",
      imageId: null,
      alt: "",
    },
    publicationDate: todayDate(),
    isPublished: true,
    isFeatured: false,
    galleryImages: [],
  };
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

function getPostSummary(content: string): string {
  const plainText = stripHtml(content);

  if (plainText.length <= 120) return plainText;

  return `${plainText.slice(0, 120)}...`;
}

function getStatusLabel(isPublished: boolean): string {
  return isPublished ? "Publicado" : "No publicado";
}

function getStatusColor(isPublished: boolean): "success" | "default" {
  return isPublished ? "success" : "default";
}

const NewsPostsTab = ({ onFeedback }: Props) => {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [categories, setCategories] = useState<NewsCategory[]>([]);

  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number | "all">("all");
  const [statusFilter, setStatusFilter] = useState<NewsStatusFilter>("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<NewsPostForm | null>(null);
  const [saveError, setSaveError] = useState("");

  const [postToDelete, setPostToDelete] = useState<NewsPost | null>(null);

  const cargarDatos = useCallback(async () => {
    try {
      setLoading(true);
      setListError("");

      const [categoriesResponse, postsResponse] = await Promise.all([
        newsPostsService.listarCategorias(),
        newsPostsService.listarNoticias(),
      ]);

      setCategories(categoriesResponse);
      setPosts(postsResponse);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
      setListError("No se pudieron cargar las noticias.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        post.title.toLowerCase().includes(searchValue) ||
        stripHtml(post.content).toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" || post.categoryId === categoryFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && post.isPublished) ||
        (statusFilter === "unpublished" && !post.isPublished);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, search, categoryFilter, statusFilter]);

  const openCreateDialog = () => {
    setForm(createEmptyPost(categories));
    setSaveError("");
    setDialogOpen(true);
  };

  const openEditDialog = (post: NewsPost) => {
    setForm({
      ...post,
      coverImage: { ...post.coverImage },
      galleryImages: post.galleryImages.map((image) => ({ ...image })),
    });
    setSaveError("");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(null);
    setSaveError("");
  };

  const handleSavePost = async (validForm: NewsPostForm) => {
    try {
      setSaveError("");

      if (validForm.noticiaId) {
        await newsPostsService.actualizarNoticia(validForm);
        onFeedback({
          message: "La noticia se actualizó correctamente.",
          severity: "success",
        });
      } else {
        await newsPostsService.crearNoticia(validForm);
        onFeedback({
          message: "La noticia se creó correctamente.",
          severity: "success",
        });
      }

      await cargarDatos();
      closeDialog();
    } catch (error) {
      console.error("Error al guardar noticia:", error);
      setSaveError("No se pudo guardar la noticia.");
    }
  };

  const openDeleteDialog = (post: NewsPost) => {
    setPostToDelete(post);
  };

  const closeDeleteDialog = () => {
    setPostToDelete(null);
  };

  const handleConfirmDeletePost = async () => {
    if (!postToDelete) return;

    try {
      await newsPostsService.eliminarNoticia(postToDelete.id);

      onFeedback({
        message: "La noticia se eliminó correctamente.",
        severity: "success",
      });

      closeDeleteDialog();
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar noticia:", error);

      onFeedback({
        message: "No se pudo eliminar la noticia.",
        severity: "error",
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <Typography color="text.secondary">Cargando noticias...</Typography>
      </Box>
    );
  }

  if (listError) {
    return <Alert severity="error">{listError}</Alert>;
  }

  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                size="small"
                fullWidth
                placeholder="Buscar noticias..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Categoría</InputLabel>
                <Select
                  label="Categoría"
                  value={categoryFilter}
                  onChange={(event) => {
                    const value = event.target.value;
                    setCategoryFilter(value === "all" ? "all" : Number(value));
                  }}
                >
                  <MenuItem value="all">Todas las categorías</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select
                  label="Estado"
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value as NewsStatusFilter)
                  }
                >
                  <MenuItem value="all">Todos los estados</MenuItem>
                  <MenuItem value="published">Publicado</MenuItem>
                  <MenuItem value="unpublished">No publicado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={2}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Add />}
                onClick={openCreateDialog}
                sx={{
                  whiteSpace: "nowrap",
                  px: 2,
                }}
              >
                Crear
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Stack spacing={2}>
          {filteredPosts.length === 0 ? (
            <Card variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography color="text.secondary" textAlign="center">
                  No se encontraron noticias con los filtros seleccionados.
                </Typography>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} variant="outlined" sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        md: "130px 1fr auto",
                      },
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    <NewsCoverPreview image={post.coverImage} />

                    <Box>
                      <Typography fontWeight={700} fontSize={18}>
                        {post.title}
                      </Typography>

                      <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                        {getPostSummary(post.content)}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ mt: 1.5 }}
                      >
                        <Chip
                          size="small"
                          label={post.publicationDate}
                          variant="outlined"
                        />

                        <Chip
                          size="small"
                          label={post.categoryName}
                          color="primary"
                          variant="outlined"
                        />

                        <Chip
                          size="small"
                          label={getStatusLabel(post.isPublished)}
                          color={getStatusColor(post.isPublished)}
                        />

                        {post.isFeatured ? (
                          <Chip
                            size="small"
                            label="Destacada"
                            color="warning"
                            variant="outlined"
                          />
                        ) : null}
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton onClick={() => openEditDialog(post)}>
                        <EditOutlined />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(post)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Stack>
      </Stack>

      <NewsPostFormDialog
        open={dialogOpen}
        form={form}
        categories={categories}
        saveError={saveError}
        onClose={closeDialog}
        onChangeForm={setForm}
        onChangeSaveError={setSaveError}
        onSave={handleSavePost}
      />
      {/*dialog de eliminar noticia */}
      <Dialog
        open={Boolean(postToDelete)}
        onClose={closeDeleteDialog}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            pb: 1,
          }}
        >
          Eliminar noticia
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            ¿Seguro que deseas eliminar la noticia?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDeleteDialog}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDeletePost}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

function NewsCoverPreview({ image }: {
  image: { file: File | null; previewUrl: string };
}) {
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!image.file) {
      setFileUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(image.file);
    setFileUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [image.file]);

  const src = fileUrl || image.previewUrl;

  return (
    <Box
      sx={{
        width: { xs: "100%", md: 130 },
        height: 86,
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "grey.100",
        display: "grid",
        placeItems: "center",
      }}
    >
      {src ? (
        <Box
          component="img"
          src={src}
          alt="Portada de noticia"
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
  );
}

export default NewsPostsTab;
