import type { SectionCardsData } from "../../../components/sectionCardsIcon/sectionCards.types";
import type { SectionListImageData } from "../../../components/sectionListImage/sectionListImage.types";

// -------- Servicios --------
export interface HomeServices extends SectionCardsData {
  seccionId: number | null;
}

// -------- Calidad Certificada --------
export interface HomeQuality extends SectionListImageData {
  seccionId: number | null;
}
