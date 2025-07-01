import { queryFetchWithAuth } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useProveedor(id) {
  return useQuery({
    queryKey: [`${API_URL}/${id}`],
    queryFn: queryFetchWithAuth,
    enabled: !!id,
  });
}
