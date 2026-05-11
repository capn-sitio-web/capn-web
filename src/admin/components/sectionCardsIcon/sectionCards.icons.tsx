import {
  Shield,
  EmojiEvents,
  Favorite,
  Visibility,
  Science,
  Restaurant,
  Palette,
  MedicalServices,
  Description,
  Settings,
  Search,
  Verified,
  Biotech,
  AcUnit,
  WaterDrop,
  Scale,
} from "@mui/icons-material";

import type { SectionCardIcon } from "./sectionCards.types";

export const CARD_ICON_OPTIONS: {
  value: SectionCardIcon;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "shield",
    label: "Escudo",
    icon: <Shield fontSize="small" />,
  },
  {
    value: "trophy",
    label: "Trofeo",
    icon: <EmojiEvents fontSize="small" />,
  },
  {
    value: "heart",
    label: "Corazón",
    icon: <Favorite fontSize="small" />,
  },
  {
    value: "eye",
    label: "Ojo",
    icon: <Visibility fontSize="small" />,
  },
  {
    value: "flask",
    label: "Matraz",
    icon: <Science fontSize="small" />,
  },
  {
    value: "utensils",
    label: "Cubiertos",
    icon: <Restaurant fontSize="small" />,
  },
  {
    value: "palette",
    label: "Paleta",
    icon: <Palette fontSize="small" />,
  },
  {
    value: "medical",
    label: "Médico",
    icon: <MedicalServices fontSize="small" />,
  },
  {
    value: "document",
    label: "Documento",
    icon: <Description fontSize="small" />,
  },
  {
    value: "settings",
    label: "Engranaje",
    icon: <Settings fontSize="small" />,
  },
  {
    value: "search",
    label: "Búsqueda",
    icon: <Search fontSize="small" />,
  },
  {
    value: "check",
    label: "Verificado",
    icon: <Verified fontSize="small" />,
  },
  {
    value: "microscope",
    label: "Microscopio",
    icon: <Biotech fontSize="small" />,
  },
  {
    value: "snowflake",
    label: "Liofilizador",
    icon: <AcUnit fontSize="small" />,
  },
  {
    value: "water",
    label: "Gota",
    icon: <WaterDrop fontSize="small" />,
  },
  {
    value: "scale",
    label: "Balanza",
    icon: <Scale fontSize="small" />,
  },
];

export function getCardIconOption(value: string) {
  return CARD_ICON_OPTIONS.find((option) => option.value === value);
}
