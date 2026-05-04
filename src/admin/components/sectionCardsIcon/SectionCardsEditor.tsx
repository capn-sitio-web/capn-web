import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import type {
  SectionCardIcon,
  SectionCardItem,
  SectionCardsData,
} from "./sectionCards.types";

import type { SectionCardsFormErrors } from "./sectionCards.validation";

import {
  CARD_ICON_OPTIONS,
  //getCardIconOption,
} from "./sectionCards.icons";

interface SectionCardsEditorProps {
  value: SectionCardsData;
  onChange: (value: SectionCardsData) => void;
  errors?: SectionCardsFormErrors;
  cardsTitle?: string;
  addButtonLabel?: string;
}

function createEmptyCard(): SectionCardItem {
  return {
    id: crypto.randomUUID(),
    icon: "shield",
    title: "",
    description: "",
  };
}

export default function SectionCardsEditor({
  value,
  onChange,
  errors,
  cardsTitle = "Cards",
  addButtonLabel = "Agregar card",
}: SectionCardsEditorProps) {
  const handleSectionChange = (
    field: keyof SectionCardsData,
    fieldValue: string
  ) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });
  };

  const handleCardChange = (
    cardId: string,
    field: keyof SectionCardItem,
    fieldValue: string
  ) => {
    const updatedCards = value.cards.map((card) =>
      card.id === cardId
        ? {
            ...card,
            [field]: fieldValue,
          }
        : card
    );
    onChange({
      ...value,
      cards: updatedCards,
    });
  };

  const handleAddCard = () => {
    onChange({
      ...value,
      cards: [...value.cards, createEmptyCard()],
    });
  };

  const handleDeleteCard = (cardId: string) => {
    if (value.cards.length === 1) return;
    onChange({
      ...value,
      cards: value.cards.filter((card) => card.id !== cardId),
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 2.5 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>Título de la Sección</Typography>
        <TextField
          fullWidth
          value={value.sectionTitle}
          onChange={(event) => handleSectionChange("sectionTitle", event.target.value)}
          error={Boolean(errors?.sectionTitle)}
          helperText={errors?.sectionTitle}
        />
      </Box>

      <Box sx={{ mb: 2.5 }}>
        <Typography fontWeight={700} sx={{ mb: 1 }}>Descripción de la sección</Typography>
        <TextField
          fullWidth
          multiline
          minRows={2}
          value={value.sectionDescription ?? ""}
          onChange={(event) => handleSectionChange("sectionDescription", event.target.value)}
          error={Boolean(errors?.sectionDescription)}
          helperText={errors?.sectionDescription}
        />
      </Box>

      <Box
        sx={{
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={700}>{cardsTitle}</Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddCard}
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          {addButtonLabel}
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: 2,
        }}
      >
        {value.cards.map((card, index) => {
          return (
            <Card
              key={card.id}
              variant="outlined"
              sx={{
                borderRadius: 2,
                position: "relative",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <FormControl
                    fullWidth
                    error={Boolean(errors?.cards?.[index]?.icon)}
                  >
                    <InputLabel>Icono</InputLabel>
                    <Select
                      label="Icono"
                      value={card.icon}
                      onChange={(event) =>
                        handleCardChange(
                          card.id,
                          "icon",
                          event.target.value as SectionCardIcon
                        )
                      }
                      /*renderValue={(selected) => {
                        const option = getCardIconOption(selected);
                        return (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {option?.icon}
                            <span>{option?.label}</span>
                          </Box>
                        );
                      }}*/
                    >
                      {CARD_ICON_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {option.icon}
                            {option.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {errors?.cards?.[index]?.icon && (
                      <FormHelperText>
                        {errors.cards[index]?.icon}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCard(card.id)}
                    disabled={value.cards.length === 1}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>

                <TextField
                  fullWidth
                  label="Título"
                  value={card.title}
                  onChange={(event) =>
                    handleCardChange(card.id, "title", event.target.value)
                  }
                  error={Boolean(errors?.cards?.[index]?.title)}
                  helperText={errors?.cards?.[index]?.title}
                  sx={{ mt: 2 }}
                />

                <TextField
                  fullWidth
                  multiline
                  minRows={2}
                  label="Descripción"
                  value={card.description}
                  onChange={(event) =>
                    handleCardChange(
                      card.id,
                      "description",
                      event.target.value
                    )
                  }
                  error={Boolean(errors?.cards?.[index]?.description)}
                  helperText={errors?.cards?.[index]?.description}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
