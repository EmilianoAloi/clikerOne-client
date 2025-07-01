import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Historial de Precios por Proveedor
export const useHistorialPreciosByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/articulos/historial-precios/proveedor/${idProveedor}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
