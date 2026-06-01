import { useQuery } from "@tanstack/react-query";
import { AboutService } from "./about.service";
import { mapAboutPageToAboutPageData } from "./about.mapper";
import type { AboutPageData } from "./about.types";

async function loadAboutPage(): Promise<AboutPageData> {
  const aboutPageData = await AboutService.getAboutPage();
  return mapAboutPageToAboutPageData(aboutPageData);
}

export function useAboutPage() {
  const query = useQuery({
    queryKey: ["public", "about"],
    queryFn: loadAboutPage,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
