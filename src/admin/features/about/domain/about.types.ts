export type HistoryParagraph = {
  id: string;
  text: string;
};

export type HistoryImage = {
  file: File | null;
  previewUrl: string;
};

export type History = {
  sectionTitle: string;
  paragraphs: HistoryParagraph[];
  image: HistoryImage;
};
