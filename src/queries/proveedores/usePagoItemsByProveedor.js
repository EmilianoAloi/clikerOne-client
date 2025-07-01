import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const usePagoItemsByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/pagos/proveedor/${idProveedor}/items`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
