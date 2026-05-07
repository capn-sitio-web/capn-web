export type SectionCardIcon =
  | "shield"
  | "trophy"
  | "heart"
  | "eye"
  | "flask"
  | "utensils"
  | "palette"
  | "medical"
  | "document"
  | "settings"
  | "search"
  | "check";

export interface SectionCardItem {
  id: string;
  elementId?: number | null;
  icon: SectionCardIcon;
  title: string;
  description: string;
}

export interface SectionCardsData {
  sectionTitle: string;
  sectionDescription?: string;
  cards: SectionCardItem[];
}
