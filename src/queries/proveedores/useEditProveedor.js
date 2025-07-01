import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useEditProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, proveedor, articulos, articulosEliminados }) => {
      const payload = { proveedor };
      if (articulos) payload.articulos = articulos;
      if (articulosEliminados)
        payload.articulosEliminados = articulosEliminados;

      return mutationFetchWithAuth({
        url: `${API_URL}/${id}`,
        method: "PUT",
        body: payload,
      });
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries([API_URL]);
      await queryClient.cancelQueries([`${API_URL}/${variables.id}`]);

      const previousProveedores = queryClient.getQueryData([API_URL]);
      const previousProveedor = queryClient.getQueryData([
        `${API_URL}/${variables.id}`,
      ]);

      // Actualizar lista localmente con nuevo proveedor editado
      queryClient.setQueryData([API_URL], (old = []) =>
        old.map((p) =>
          p.id_proveedor === variables.id ? { ...p, ...variables.proveedor } : p
        )
      );

      // Actualizar proveedor individual localmente
      queryClient.setQueryData([`${API_URL}/${variables.id}`], (old) => ({
        ...old,
        ...variables.proveedor,
      }));

      return { previousProveedores, previousProveedor };
    },

    onError: (err, variables, context) => {
      if (context?.previousProveedores) {
        queryClient.setQueryData([API_URL], context.previousProveedores);
      }
      if (context?.previousProveedor) {
        queryClient.setQueryData(
          [`${API_URL}/${variables.id}`],
          context.previousProveedor
        );
      }
    },

    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries([API_URL]);
      queryClient.invalidateQueries([`${API_URL}/${variables.id}`]);
    },
  });
}
