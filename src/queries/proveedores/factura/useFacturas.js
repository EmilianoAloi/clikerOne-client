import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Trae todas las facturas
export const useFacturas = () =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/facturas/allFacturas`,
    ],
    queryFn: queryFetchWithAuth,
    select: (data) => data || [],
  });
