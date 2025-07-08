import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Órdenes de Pago por Proveedor
export const useOPByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/pagos/proveedor/${idProveedor}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
