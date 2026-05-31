import { useQuery } from "@tanstack/react-query";

import { AccreditationService } from "./accreditation.service";
import { mapAccreditationPageToAccreditationPageData } from "./accreditation.mapper";
import type { AccreditationPageData } from "./accreditation.types";

async function loadAccreditationPage(): Promise<AccreditationPageData> {
  const accreditationPageData = await AccreditationService.getAccreditationPage();
  return mapAccreditationPageToAccreditationPageData(accreditationPageData);
}

export function useAccreditationPage() {
  const query = useQuery({
    queryKey: ["public", "accreditation"],
    queryFn: loadAccreditationPage,
  });
  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
