import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_proveedor) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/${id_proveedor}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("No se pudo eliminar el proveedor");
      return true;
    },
    onMutate: async (id_proveedor) => {
      await queryClient.cancelQueries(["proveedores"]);

      const previousProveedores = queryClient.getQueryData(["proveedores"]);

      // Actualizamos el proveedor eliminado localmente cambiando estado_logico a 0
      queryClient.setQueryData(["proveedores"], (old = []) =>
        old.map((p) =>
          p.id_proveedor === id_proveedor ? { ...p, estado_logico: 0 } : p
        )
      );

      return { previousProveedores };
    },
    onError: (error, id_proveedor, context) => {
      if (context?.previousProveedores) {
        queryClient.setQueryData(["proveedores"], context.previousProveedores);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["proveedores"]);
    },
  });
}
