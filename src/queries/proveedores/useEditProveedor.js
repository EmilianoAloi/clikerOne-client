import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useEditProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, proveedor, articulos, articulosEliminados }) => {
      const payload = { proveedor };
      if (articulos) payload.articulos = articulos;
      if (articulosEliminados)
        payload.articulosEliminados = articulosEliminados;

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || "Error al actualizar proveedor");
      }

      return res.json(); // Proveedor actualizado
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries(["proveedores"]);
      await queryClient.cancelQueries(["proveedor", variables.id]);

      const previousProveedores = queryClient.getQueryData(["proveedores"]);
      const previousProveedor = queryClient.getQueryData([
        "proveedor",
        variables.id,
      ]);

      // Actualizar lista localmente con nuevo proveedor editado
      queryClient.setQueryData(["proveedores"], (old = []) =>
        old.map((p) =>
          p.id_proveedor === variables.id ? { ...p, ...variables.proveedor } : p
        )
      );

      // Actualizar proveedor individual localmente
      queryClient.setQueryData(["proveedor", variables.id], (old) => ({
        ...old,
        ...variables.proveedor,
      }));

      return { previousProveedores, previousProveedor };
    },

    onError: (err, variables, context) => {
      // Revertir cambios en caso de error
      if (context?.previousProveedores) {
        queryClient.setQueryData(["proveedores"], context.previousProveedores);
      }
      if (context?.previousProveedor) {
        queryClient.setQueryData(
          ["proveedor", variables.id],
          context.previousProveedor
        );
      }
    },

    onSettled: (data, error, variables) => {
      // Refrescar datos para mantener sincronización con backend
      queryClient.invalidateQueries(["proveedores"]);
      queryClient.invalidateQueries(["proveedor", variables.id]);
    },
  });
}
