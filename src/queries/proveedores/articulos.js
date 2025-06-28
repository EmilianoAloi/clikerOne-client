import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 1. Traer artículos (con filtro por proveedor opcional)
export function useArticulosProveedor(idProveedor) {
  return useQuery({
    queryKey: ["articulos", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `/api/proveedor-articulo?proveedor=${idProveedor}`
      );
      return res.json();
    },
    enabled: !!idProveedor,
  });
}

// 2. Crear artículo
export function useCrearArticulo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nuevoArticulo) => {
      const res = await fetch("/api/proveedor-articulo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoArticulo),
      });
      if (!res.ok) throw new Error("Error al crear artículo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articulos"]);
    },
  });
}

// 3. Editar artículo
export function useEditarArticulo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, datos }) => {
      const res = await fetch(`/api/proveedor-articulo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error("Error al editar artículo");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["articulos"]);
    },
  });
}

// 4. Historial de precios de un artículo
export function useHistorialPrecios(idArticulo) {
  return useQuery({
    queryKey: ["historial-precios", idArticulo],
    queryFn: async () => {
      const res = await fetch(
        `/api/proveedor-articulo/${idArticulo}/historial-precios`
      );
      return res.json();
    },
    enabled: !!idArticulo,
  });
}

// 5. Agregar precio histórico
export function useAgregarPrecioHistorico(idArticulo) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nuevoPrecio) => {
      const res = await fetch(
        `/api/proveedor-articulo/${idArticulo}/historial-precios`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPrecio),
        }
      );
      if (!res.ok) throw new Error("Error al agregar precio");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["historial-precios", idArticulo]);
      queryClient.invalidateQueries(["articulos"]);
    },
  });
}
