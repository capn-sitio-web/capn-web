import type {
  ServiceAnalysisSection,
  ServiceDetailImage,
} from "../domain/services.types";

export type ServiceAnalysisApiPayload = {
  seccionId: number | null;
  sectionTitle: string;
  sectionDescription: string;
  extendedContent?: string;
  items: {
    id: string;
    text: string;
  }[];
  image: {
    previewUrl: string;
    imageId: number | null;
    alt: string;
  };
  galleryImages?: {
    id: string;
    imageId: number | null;
    previewUrl: string;
    alt?: string | null;
    order: number;
  }[];
};

export type ServiceAnalysisApiResponse = {
  message: string;
  data: ServiceAnalysisApiPayload;
};

export function mapServiceAnalysisFromApi<T extends ServiceAnalysisSection>(
  data: ServiceAnalysisApiPayload
): T {
  const mapped = {
    seccionId: data.seccionId,
    sectionTitle: data.sectionTitle,
    sectionDescription: data.sectionDescription ?? "",
    extendedContent: data.extendedContent ?? "",
    items: data.items.map((item) => ({
      id: item.id,
      text: item.text,
    })),
    image: {
      file: null,
      previewUrl: data.image?.previewUrl ?? "",
      imageId: data.image?.imageId ?? null,
      alt: data.image?.alt ?? "",
    },
    galleryImages: (data.galleryImages ?? []).map<ServiceDetailImage>((image) => ({
      id: image.id,
      imageId: image.imageId,
      file: null,
      previewUrl: image.previewUrl,
      alt: image.alt ?? "",
      order: image.order,
    })),
    galleryImagesToDelete: [],
  };

  return mapped as unknown as T;
}

export function buildServiceAnalysisFormData(
  data: ServiceAnalysisSection
): FormData {
  const formData = new FormData();

  formData.append("sectionTitle", data.sectionTitle);
  formData.append("sectionDescription", data.sectionDescription ?? "");
  formData.append("extendedContent", data.extendedContent ?? "");
  formData.append("image_alt", data.image.alt ?? "");

  data.items.forEach((item, index) => {
    formData.append(`items[${index}][id]`, item.id);
    formData.append(`items[${index}][text]`, item.text);
  });

  if (data.image.file) {
    formData.append("image", data.image.file);
  }

  data.galleryImages
    .filter((image) => image.file)
    .forEach((image, index) => {
      formData.append(`galleryImages[${index}]`, image.file as File);
      formData.append(`galleryImagesOrder[${index}]`, String(image.order || index + 1));
    });

  (data.galleryImagesToDelete ?? []).forEach((imageId, index) => {
    formData.append(`galleryImagesToDelete[${index}]`, String(imageId));
  });

  return formData;
}
