import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutos sin volver a pedir datos
      gcTime: 1000 * 60 * 30, // guarda cache por 30 minutos
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
