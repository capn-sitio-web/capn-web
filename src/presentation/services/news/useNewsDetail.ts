import { useQuery } from "@tanstack/react-query";

import { NewsService } from "./news.service";
import { mapNewsDetailToNewsDetail } from "./news.mapper";

import type { NewsDetail } from "./news.types";

async function loadNewsDetail(idnoticia: number): Promise<NewsDetail> {
  const newsDetailData = await NewsService.getNewsDetail(idnoticia);

  return mapNewsDetailToNewsDetail(newsDetailData);
}

export function useNewsDetail(idnoticia: number | null) {
  const query = useQuery({
    queryKey: ["public", "news-detail", idnoticia],
    queryFn: () => loadNewsDetail(idnoticia as number),
    enabled: !!idnoticia,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
