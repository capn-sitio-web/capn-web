// -------- Historia --------
export type HistoryParagraph = {
  id: number;
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

// -------- Misión y Visión --------
export type MissionVision = {
  mission: string;
  vision: string;
};
