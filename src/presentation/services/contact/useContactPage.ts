import { useQuery } from "@tanstack/react-query";
import { ContactService } from "./contact.service";
import {
  mapBannerToContactBanner,
  mapInformacionToContactLocation,
} from "./contact.mapper";
import type { ContactPageData } from "./contact.types";

async function loadContactPage(): Promise<ContactPageData> {
  const [banner, informacion] = await Promise.all([
    ContactService.getBanner(),
    ContactService.getInformacion(),
  ]);

  return {
    banner: mapBannerToContactBanner(banner),
    location: mapInformacionToContactLocation(informacion),
  };
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
