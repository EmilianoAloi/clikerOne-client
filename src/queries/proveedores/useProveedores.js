import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useProveedores() {
  return useQuery({
    queryKey: [API_URL], // La url completa como key
    queryFn: queryFetchWithAuth, //fetcher con token
  });
}
