import { useQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useProveedor(id) {
  return useQuery({
    queryKey: ["proveedor", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Proveedor no encontrado");
      return res.json();
    },
    enabled: !!id, // Solo fetch si hay id
  });
}
