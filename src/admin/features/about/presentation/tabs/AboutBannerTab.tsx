import { forwardRef } from "react";

import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";

import type { AboutBanner } from "../../domain/about.types";
import { hasAboutBannerChanges } from "../../domain/aboutChangeDetection";

export type AboutBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: AboutBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: AboutBanner) => Promise<void>;
};

const AboutBannerTab = forwardRef<AboutBannerTabHandle, Props>(
  function AboutBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) => onCommitSave(nextSaved as AboutBanner)}
        hasChanges={(current, saved) =>
          hasAboutBannerChanges(current as AboutBanner, saved as AboutBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default AboutBannerTab;
