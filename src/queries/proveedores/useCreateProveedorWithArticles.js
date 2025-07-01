import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useCreateProveedorWithArticles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proveedor, articulos }) => {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proveedor, articulos }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Error al crear proveedor");
      }
      return data;
    },
    onSuccess: () => {
      // Refresca automáticamente el listado al volver
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
}
