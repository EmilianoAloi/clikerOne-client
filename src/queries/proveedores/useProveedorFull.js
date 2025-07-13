// src/queries/proveedores/useProveedorFull.js
import { queryFetchWithAuth } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useProveedorFull(id) {
  return useQuery({
    queryKey: [`${API_URL}/${id}/full`],
    queryFn: queryFetchWithAuth,
    enabled: !!id,
    staleTime: 300_000,
    refetchOnWindowFocus: false,
  });
}
