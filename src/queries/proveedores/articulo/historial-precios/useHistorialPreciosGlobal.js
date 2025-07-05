import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

const API_URL = `${
  import.meta.env.VITE_API_URL
}/api/proveedores/articulos/articulos/historial-precios
`;

export function useHistorialPreciosGlobal() {
  return useQuery({
    queryKey: [API_URL],
    queryFn: queryFetchWithAuth,
  });
}
