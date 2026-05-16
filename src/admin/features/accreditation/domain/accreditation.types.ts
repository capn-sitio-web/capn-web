import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";
import type { SectionCardsData } from "../../../components/sectionCardsIcon/sectionCards.types";

// -------- Banner --------
export interface AccreditationBanner extends SectionBannerData {
  seccionId: number | null;
}

// -------- Sistema de Calidad --------
export interface AccreditationQualitySystem extends SectionCardsData {
  seccionId: number | null;
}
