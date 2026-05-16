import type { NewsBanner } from "./news.types";
import { hasSectionBannerChanges } from "../../../components/sectionBanner/sectionBannerChangeDetection";


/** ---- Banner ---- */
export function hasNewsBannerChanges(current: NewsBanner, saved: NewsBanner): boolean {
  return hasSectionBannerChanges(current, saved);
}