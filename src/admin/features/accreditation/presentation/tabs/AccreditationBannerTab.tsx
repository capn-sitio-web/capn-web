import { forwardRef } from "react";

import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";

import type { AccreditationBanner } from "../../domain/accreditation.types";
import { hasAccreditationBannerChanges } from "../../domain/accreditationChangeDetection";

export type AccreditationBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: AccreditationBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: AccreditationBanner) => Promise<void>;
};

const AccreditationBannerTab = forwardRef<AccreditationBannerTabHandle, Props>(
  function AccreditationBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) =>
          onCommitSave(nextSaved as AccreditationBanner)
        }
        hasChanges={(current, saved) =>
          hasAccreditationBannerChanges(current as AccreditationBanner, saved as AccreditationBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default AccreditationBannerTab;
