import { useEffect, useState } from "react";

import { ContactService } from "./contact.service";
import { contactFallbackData } from "./contact.fallback";

import {
  mapBannerToContactBanner,
  mapInformacionToContactLocation,
} from "./contact.mapper";

import type { ContactLocation, ContactPageData } from "./contact.types";

function mergeLocationWithFallback(
  mapped: ContactLocation,
  fallback: ContactLocation
): ContactLocation {
  return {
    ...fallback,
    ...mapped,
    mapSrc: mapped.mapSrc || fallback.mapSrc,
    locationName: mapped.locationName || fallback.locationName,
    phone: mapped.phone || fallback.phone,
    email: mapped.email || fallback.email,
    facebookUrl: mapped.facebookUrl || fallback.facebookUrl,
  };
}

export function useContactPage() {
  const [data, setData] = useState<ContactPageData>(contactFallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContactPage() {
      setLoading(true);

      const [bannerResult, informacionResult] = await Promise.allSettled([
        ContactService.getBanner(),
        ContactService.getInformacion(),
      ]);

      const mappedBanner =
        bannerResult.status === "fulfilled"
          ? mapBannerToContactBanner(bannerResult.value)
          : contactFallbackData.banner;

      const mappedLocation =
        informacionResult.status === "fulfilled"
          ? mapInformacionToContactLocation(informacionResult.value)
          : contactFallbackData.location;

      setData({
        banner: {
          ...contactFallbackData.banner,
          ...mappedBanner,
          image: mappedBanner.image || contactFallbackData.banner.image,
        },

        location: mergeLocationWithFallback(
          mappedLocation,
          contactFallbackData.location
        ),
      });

      setLoading(false);
    }

    loadContactPage();
  }, []);

  return {
    data,
    loading,
  };
}
