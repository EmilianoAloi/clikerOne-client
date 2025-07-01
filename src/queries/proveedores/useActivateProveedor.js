import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useActivateProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_proveedor) => {
      return mutationFetchWithAuth({
        url: `${API_URL}/${id_proveedor}`,
        method: "PUT",
        body: { proveedor: { estado_logico: 1 } },
      });
    },
    // Optimistic update para que UI se actualice instantáneo
    onMutate: async (id_proveedor) => {
      await queryClient.cancelQueries([API_URL]);

      const previousProveedores = queryClient.getQueryData([API_URL]);

      queryClient.setQueryData([API_URL], (old = []) =>
        old.map((p) =>
          p.id_proveedor === id_proveedor ? { ...p, estado_logico: 1 } : p
        )
      );

      return { previousProveedores };
    },
    onError: (err, id_proveedor, context) => {
      if (context?.previousProveedores) {
        queryClient.setQueryData([API_URL], context.previousProveedores);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([API_URL]);
    },
  });
}
