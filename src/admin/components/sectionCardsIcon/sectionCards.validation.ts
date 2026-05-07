import { z } from "zod";
import type { SectionCardIcon } from "./sectionCards.types";

export const sectionCardIconValidation = z.object({
  id: z.string(),
  elementId: z.number().nullable().optional(),
  icon: z.string().min(1, "El ícono es obligatorio"),
  title: z.string().trim().min(1, "El título de la card es obligatorio"),
  description: z.string().trim().min(1, "La descripción de la card es obligatoria"),
});

export const sectionCardsIcon = z.object({
  sectionTitle: z.string().trim().min(1, "El título de la sección es obligatorio"),
  sectionDescription: z.string().optional(),
  cards: z.array(sectionCardIconValidation).min(1, "Debe existir al menos una card"),
});

export type SectionCardsValidatedData = {
  sectionTitle: string;
  sectionDescription?: string;
  cards: {
    id: string;
    elementId?: number | null;
    icon: SectionCardIcon;
    title: string;
    description: string;
  }[];
};

export type SectionCardsFormErrors = {
  sectionTitle?: string;
  sectionDescription?: string;
  cards?: {
    icon?: string;
    title?: string;
    description?: string;
  }[];
};

type ValidateSectionCardsResult =
  | {
      success: true;
      errors: SectionCardsFormErrors;
      data: SectionCardsValidatedData;
    }
  | {
      success: false;
      errors: SectionCardsFormErrors;
      data: null;
    };

export function validateSectionCards(data: unknown): ValidateSectionCardsResult {
  const result = sectionCardsIcon.safeParse(data);
  if (result.success) {
    return {
      success: true,
      errors: {},
      data: {
        sectionTitle: result.data.sectionTitle,
        sectionDescription: result.data.sectionDescription,
        cards: result.data.cards.map((card) => ({
          ...card,
          icon: card.icon as SectionCardIcon,
        })),
      },
    };
  }

  const errors: SectionCardsFormErrors = {};

  result.error.issues.forEach((issue) => {
    const path = issue.path;

    if (path[0] === "sectionTitle") {
      errors.sectionTitle = issue.message;
    }

    if (path[0] === "sectionDescription") {
      errors.sectionDescription = issue.message;
    }

    if (path[0] === "cards" && typeof path[1] === "number") {
      const index = path[1];
      const field = path[2] as "icon" | "title" | "description";

      if (!errors.cards) errors.cards = [];
      if (!errors.cards[index]) errors.cards[index] = {};

      errors.cards[index][field] = issue.message;
    }
  });

  return {
    success: false,
    errors,
    data: null,
  };
}
