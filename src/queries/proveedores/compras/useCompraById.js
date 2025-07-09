import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// idCompra: número o string (ID de la OC)
export const useCompraById = (idCompra) =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/compras/${idCompra}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idCompra,
    select: (data) => data || null, // asegurás null si no hay datos
  });
