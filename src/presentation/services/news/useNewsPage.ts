import { useQuery } from "@tanstack/react-query";

import { NewsService } from "./news.service";
import { mapNewsPageToNewsPageData } from "./news.mapper";

import type { NewsPageData } from "./news.types";

type UseNewsPageParams = {
  page: number;
  category: string | null;
};

async function loadNewsPage({
  page,
  category,
}: UseNewsPageParams): Promise<NewsPageData> {
  const newsPageData = await NewsService.getNewsPage({
    page,
    category,
  });

  return mapNewsPageToNewsPageData(newsPageData);
}

export function useNewsPage({ page, category }: UseNewsPageParams) {
  const query = useQuery({
    queryKey: ["public", "news", page, category ?? "all"],
    queryFn: () => loadNewsPage({ page, category }),
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
