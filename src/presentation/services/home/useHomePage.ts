import { useQuery } from "@tanstack/react-query";
import { HomeService } from "./home.service";
import { mapHomePageToHomePageData } from "./home.mapper";
import type { HomePageData } from "./home.types";

async function loadHomePage(): Promise<HomePageData> {
  const homePageData = await HomeService.getHomePage();
  return mapHomePageToHomePageData(homePageData);
}

export function useHomePage() {
  const query = useQuery({
    queryKey: ["public", "home"],
    queryFn: loadHomePage,
  });
  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
