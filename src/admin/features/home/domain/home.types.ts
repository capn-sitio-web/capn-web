import type { SectionBannerData } from "../../../components/sectionBanner/sectionBanner.types";
import type { SectionCardsData } from "../../../components/sectionCardsIcon/sectionCards.types";
import type { SectionListImageData } from "../../../components/sectionListImage/sectionListImage.types";

// -------- Banner --------
export interface HomeBanner extends SectionBannerData {
  seccionId: number | null;
}

// -------- Servicios --------
export interface HomeServices extends SectionCardsData {
  seccionId: number | null;
}

// -------- Calidad Certificada --------
export interface HomeQuality extends SectionListImageData {
  seccionId: number | null;
}
