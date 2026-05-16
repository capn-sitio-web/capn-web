import { forwardRef } from "react";

import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";

import type { NewsBanner } from "../../domain/news.types";
import { hasNewsBannerChanges } from "../../domain/newsChangeDetection";

export type NewsBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: NewsBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: NewsBanner) => Promise<void>;
};

const NewsBannerTab = forwardRef<NewsBannerTabHandle, Props>(
  function NewsBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) => onCommitSave(nextSaved as NewsBanner)}
        hasChanges={(current, saved) =>
          hasNewsBannerChanges(current as NewsBanner, saved as NewsBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default NewsBannerTab;
