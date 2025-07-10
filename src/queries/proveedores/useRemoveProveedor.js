import { mutationFetchWithAuth } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useRemoveProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_proveedor) =>
      mutationFetchWithAuth({
        url: `${API_URL}/${id_proveedor}`,
        method: "DELETE",
      }),

    onMutate: async (id_proveedor) => {
      await queryClient.cancelQueries([API_URL]);

      const previousProveedores = queryClient.getQueryData([API_URL]);

      queryClient.setQueryData([API_URL], (old = []) =>
        old.map((p) =>
          p.id_proveedor === id_proveedor ? { ...p, estado_logico: 0 } : p
        )
      );

      return { previousProveedores };
    },

    onError: (_error, _id, context) => {
      queryClient.setQueryData([API_URL], context.previousProveedores);
    },

    onSettled: () => {
      queryClient.invalidateQueries([API_URL]);
    },
  });
}
