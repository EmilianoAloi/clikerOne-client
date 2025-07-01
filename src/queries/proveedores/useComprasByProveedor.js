import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const useComprasByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/compras/proveedor/${idProveedor}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
