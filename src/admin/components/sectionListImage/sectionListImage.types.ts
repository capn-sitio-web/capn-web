export type SectionImageValue = {
  file: File | null;
  previewUrl: string;
  imageId: number | null;
  alt: string;
};

export type SectionListItem = {
  id: string;
  text: string;
};

export type SectionListImageData = {
  sectionTitle: string;
  sectionDescription?: string;
  items: SectionListItem[];
  image: SectionImageValue;
};
