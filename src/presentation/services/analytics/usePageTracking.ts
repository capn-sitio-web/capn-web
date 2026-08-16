import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analyticsService } from "./analytics.service";

const PAGE_NAMES: Record<string, string> = {
  "/": "Inicio",
  "/nosotros": "Nosotros",
  "/servicios": "Servicios",
  "/acreditacion": "Acreditación",
  "/noticias": "Noticias",
  "/contacto": "Contacto",
};

function getOrCreateStorageValue(key: string): string {
  const existingValue = localStorage.getItem(key);

  if (existingValue) {
    return existingValue;
  }

  const newValue = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  localStorage.setItem(key, newValue);

  return newValue;
}

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    let pagePath = location.pathname;

    // Normalizar rutas dinámicas para reportes agrupados
    if (pagePath.startsWith("/noticias/")) {
      pagePath = "/noticias";
    } else if (pagePath.startsWith("/servicios/")) {
      pagePath = "/servicios";
    }

    const pageName = PAGE_NAMES[pagePath] ?? pagePath;

    const visitorId = getOrCreateStorageValue("capn_visitor_id");
    const sessionId = getOrCreateStorageValue("capn_session_id");

    analyticsService
      .registrarVisita({
        page_path: pagePath,
        page_name: pageName,
        visitor_id: visitorId,
        session_id: sessionId,
        referrer: document.referrer || undefined,
      })
      .catch((error) => {
        console.error("Error registrando visita:", error);
      });
  }, [location.pathname]);
}
