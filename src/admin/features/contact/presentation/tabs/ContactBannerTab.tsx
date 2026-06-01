import { forwardRef } from "react";
import SectionBannerTab, {
  type SectionBannerTabHandle,
} from "../../../../components/sectionBanner/SectionBannerTab";
import type { ContactBanner } from "../../domain/contact.types";
import { hasContactBannerChanges } from "../../domain/contactChangeDetection";

export type ContactBannerTabHandle = SectionBannerTabHandle;

type Props = {
  initialValue: ContactBanner;
  onChanges: (changes: boolean) => void;
  onCommitSave: (nextSaved: ContactBanner) => Promise<void>;
};

const ContactBannerTab = forwardRef<ContactBannerTabHandle, Props>(
  function ContactBannerTab({ initialValue, onChanges, onCommitSave }, ref) {
    return (
      <SectionBannerTab
        ref={ref}
        initialValue={initialValue}
        onChanges={onChanges}
        onCommitSave={(nextSaved) => onCommitSave(nextSaved as ContactBanner)}
        hasChanges={(current, saved) =>
          hasContactBannerChanges(current as ContactBanner, saved as ContactBanner)
        }
        imageLabel="Imagen de portada"
      />
    );
  }
);

export default ContactBannerTab;
