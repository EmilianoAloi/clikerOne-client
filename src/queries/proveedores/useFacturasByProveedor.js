import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const useFacturasByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/facturas/proveedor/${idProveedor}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
