import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const useCompraById = (idCompra) =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/compras/${idCompra}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idCompra,
  });
