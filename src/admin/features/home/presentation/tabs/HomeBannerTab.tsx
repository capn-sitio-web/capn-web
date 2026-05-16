import { forwardRef } from "react";
import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";
import type { HomeBanner } from "../../domain/home.types";
import { hasHomeBannerChanges } from "../../domain/homeChangeDetection";

export type HomeBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: HomeBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: HomeBanner) => Promise<void>;
};

const HomeBannerTab = forwardRef<HomeBannerTabHandle, Props>(
  function HomeBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) => onCommitSave(nextSaved as HomeBanner)}
        hasChanges={(current, saved) =>
          hasHomeBannerChanges(current as HomeBanner, saved as HomeBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default HomeBannerTab;
