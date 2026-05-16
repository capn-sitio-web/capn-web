export type SectionBannerImage = {
  file: File | null;
  previewUrl: string;
  imageId: number | null;
  alt: string;
};

export type SectionBannerData = {
  sectionTitle: string;
  description: string;
  image: SectionBannerImage;
};
