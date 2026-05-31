import { useQuery } from "@tanstack/react-query";
import { ContactService } from "./contact.service";
import { mapContactPageToContactPageData } from "./contact.mapper";
import type { ContactPageData } from "./contact.types";

async function loadContactPage(): Promise<ContactPageData> {
  const contactPageData = await ContactService.getContactPage();
  return mapContactPageToContactPageData(contactPageData);
}

export function useContactPage() {
  const query = useQuery({
    queryKey: ["public", "contact"],
    queryFn: loadContactPage,
  });
  return {
    data: query.data,
    loading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
