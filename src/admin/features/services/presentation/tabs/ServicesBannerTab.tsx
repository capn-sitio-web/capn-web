import { forwardRef } from "react";

import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";

import type { ServicesBanner } from "../../domain/services.types";
import { hasServicesBannerChanges } from "../../domain/servicesChangeDetection";

export type ServicesBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: ServicesBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ServicesBanner) => Promise<void>;
};

const ServicesBannerTab = forwardRef<ServicesBannerTabHandle, Props>(
  function ServicesBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) => onCommitSave(nextSaved as ServicesBanner)}
        hasChanges={(current, saved) =>
          hasServicesBannerChanges(current as ServicesBanner, saved as ServicesBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default ServicesBannerTab;
