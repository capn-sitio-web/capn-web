import type {
  PublicNewsPageResponse,
  PublicNewsCardData,
  PublicNewsDetailData,
  NewsBanner,
  NewsCardItem,
  NewsPageData,
  NewsDetail,
} from "./news.types";

import type { PublicBannerData } from "../public.types";

function mapBannerToNewsBanner(data: PublicBannerData): NewsBanner {
  return {
    title: data.sectionTitle,
    subtitle: data.description,
    image: data.image?.previewUrl || "",
  };
}

function mapNewsCard(data: PublicNewsCardData): NewsCardItem {
  return {
    id: data.id,
    category: data.category?.name ?? "Sin categoría",
    categorySlug: data.category?.slug ?? null,
    date: data.date,
    title: data.title,
    description: data.excerpt,
    image: data.image.url,
    imageAlt: data.image.alt,
    link: `/noticias/${data.id}`,
  };
}

export function mapNewsPageToNewsPageData(
  data: PublicNewsPageResponse["data"]
): NewsPageData {
  return {
    banner: data.banner ? mapBannerToNewsBanner(data.banner) : null,

    categories: data.categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })),

    featured: data.featured.map(mapNewsCard),

    news: data.news.map(mapNewsCard),

    pagination: {
      currentPage: data.pagination.currentPage,
      lastPage: data.pagination.lastPage,
      perPage: data.pagination.perPage,
      total: data.pagination.total,
      hasMorePages: data.pagination.hasMorePages,
    },
  };
}

export function mapNewsDetailToNewsDetail(
  data: PublicNewsDetailData
): NewsDetail {
  return {
    id: data.id,
    title: data.title,
    date: data.date,
    category: data.category?.name ?? null,
    image: data.image.url,
    imageAlt: data.image.alt,
    content: data.content,
    gallery: data.additionalImages.map((image) => image.url),
  };
}
