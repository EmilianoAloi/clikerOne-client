import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook para actualizar (editar) un artículo de proveedor.
 *
 * @param {number} idProveedor - ID del proveedor al que pertenece el artículo.
 */
export const useArticuloUpdateMutation = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articulo) => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/${idProveedor}/articulos/${
          articulo.id_articulo
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...articulo,
            precio_unitario: Number(articulo.precio_unitario),
            id_proveedor: idProveedor,
          }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      return await res.json();
    },

    onSuccess: () => {
      toast.success("Artículo actualizado correctamente");
      queryClient.invalidateQueries(["articulos", idProveedor]);
    },

    onError: (err) => {
      toast.error(err.message || "No se pudo actualizar el artículo");
    },
  });
};
