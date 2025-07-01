import { mutationFetchWithAuth } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useRemoveProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_proveedor) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/${id_proveedor}`,
        method: "DELETE",
      });
    },
    onMutate: async (id_proveedor) => {
      await queryClient.cancelQueries([
        `${import.meta.env.VITE_API_URL}/api/proveedores`,
      ]);

      const previousProveedores = queryClient.getQueryData([
        `${import.meta.env.VITE_API_URL}/api/proveedores`,
      ]);

      // Actualiza localmente el estado_logico a 0
      queryClient.setQueryData(
        [`${import.meta.env.VITE_API_URL}/api/proveedores`],
        (old = []) =>
          old.map((p) =>
            p.id_proveedor === id_proveedor ? { ...p, estado_logico: 0 } : p
          )
      );

      return { previousProveedores };
    },
    onError: (error, id_proveedor, context) => {
      if (context?.previousProveedores) {
        queryClient.setQueryData(
          [`${import.meta.env.VITE_API_URL}/api/proveedores`],
          context.previousProveedores
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        `${import.meta.env.VITE_API_URL}/api/proveedores`,
      ]);
    },
  });
}
