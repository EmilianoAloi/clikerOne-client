import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Obtener todas las OPs
export const useOPs = () =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/allPagos`,
    ],
    queryFn: queryFetchWithAuth,
  });
