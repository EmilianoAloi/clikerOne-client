import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const useArticulosByProveedor = (idProveedor) =>
  useQuery({
    queryKey: [
      `${
        import.meta.env.VITE_API_URL
      }/api/proveedores/articulos/proveedor/${idProveedor}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idProveedor,
  });
