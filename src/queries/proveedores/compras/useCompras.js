import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Trae todas las compras
export const useCompras = () =>
  useQuery({
    queryKey: [`${import.meta.env.VITE_API_URL}/api/proveedores/compras/all`],
    queryFn: queryFetchWithAuth,
    select: (data) => data || [],
  });
