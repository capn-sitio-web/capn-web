import type { PublicBannerData } from "../public.types";

export type PublicNewsCategoryData = {
  id: number;
  name: string;
  slug: string;
};

export type PublicNewsImageData = {
  url: string;
  alt: string;
};

export type PublicNewsCardData = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: PublicNewsImageData;
  category: PublicNewsCategoryData | null;
  isFeatured: boolean;
};

export type PublicNewsPaginationData = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  hasMorePages: boolean;
};

export type PublicNewsPageResponse = {
  message: string;
  data: {
    banner: PublicBannerData | null;
    categories: PublicNewsCategoryData[];
    featured: PublicNewsCardData[];
    news: PublicNewsCardData[];
    pagination: PublicNewsPaginationData;
  };
};

export type PublicNewsDetailData = {
  id: number;
  title: string;
  content: string;
  date: string;
  image: PublicNewsImageData;
  category: PublicNewsCategoryData | null;
  additionalImages: {
    id: number;
    url: string;
    alt: string;
    order: number;
  }[];
};

export type PublicNewsDetailResponse = {
  message: string;
  data: PublicNewsDetailData;
};

export type NewsBanner = {
  title: string;
  subtitle: string;
  image: string;
};

export type NewsCategory = {
  id: number;
  name: string;
  slug: string;
};

export type NewsCardItem = {
  id: number;
  category: string;
  categorySlug: string | null;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
};

export type NewsPagination = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  hasMorePages: boolean;
};

export type NewsPageData = {
  banner: NewsBanner | null;
  categories: NewsCategory[];
  featured: NewsCardItem[];
  news: NewsCardItem[];
  pagination: NewsPagination;
};

export type NewsDetail = {
  id: number;
  title: string;
  date: string;
  category: string | null;
  image: string;
  imageAlt: string;
  content: string;
  gallery: string[];
};
