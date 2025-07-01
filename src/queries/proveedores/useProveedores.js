import { useQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useProveedores() {
  return useQuery({
    queryKey: ["proveedores"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener proveedores");
      return res.json();
    },
  });
}
