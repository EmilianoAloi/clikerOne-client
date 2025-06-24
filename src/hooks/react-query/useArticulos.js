import { useQuery } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/articulos`;

export const useArticulos = () => {
  return useQuery({
    queryKey: ["articulos"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener artículos");
      return res.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutos sin refetch si no cambia el foco
  });
};
