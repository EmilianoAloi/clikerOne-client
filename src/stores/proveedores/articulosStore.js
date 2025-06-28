import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Cambiá la URL base si es necesario
const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedor-articulo`;

export function useArticulos() {
  return useQuery({
    queryKey: ["articulos"],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al traer artículos");
      return res.json();
    },
  });
}

export function useArticulosPorProveedor(idProveedor) {
  return useQuery({
    queryKey: ["articulos", idProveedor],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/proveedor/${idProveedor}`);
      if (!res.ok) throw new Error("Error al traer artículos por proveedor");
      return res.json();
    },
    enabled: !!idProveedor,
  });
}

export function useCrearArticulo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (articulo) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });
      if (!res.ok) throw new Error("Error al crear artículo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
}

export function useEditarArticulo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, articulo }) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });
      if (!res.ok) throw new Error("Error al editar artículo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
}

export function useEliminarArticulo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar artículo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articulos"] });
    },
  });
}

export function useHistorialPreciosArticulo(idArticulo) {
  return useQuery({
    queryKey: ["historialPrecios", idArticulo],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/${idArticulo}/historial-precios`);
      if (!res.ok) throw new Error("Error al traer historial de precios");
      return res.json();
    },
    enabled: !!idArticulo,
  });
}
