import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useActivateProveedor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id_proveedor) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/${id_proveedor}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proveedor: { estado_logico: 1 } }),
        }
      );
      if (!res.ok) throw new Error("No se pudo activar el proveedor");
      return res.json();
    },
    // Optimistic update para que UI se actualice instantáneo
    onMutate: async (id_proveedor) => {
      await queryClient.cancelQueries(["proveedores"]);

      const previousProveedores = queryClient.getQueryData(["proveedores"]);

      queryClient.setQueryData(["proveedores"], (old = []) =>
        old.map((p) =>
          p.id_proveedor === id_proveedor ? { ...p, estado_logico: 1 } : p
        )
      );

      return { previousProveedores };
    },
    onError: (err, id_proveedor, context) => {
      // Si falla la mutación, revertir al estado anterior
      if (context?.previousProveedores) {
        queryClient.setQueryData(["proveedores"], context.previousProveedores);
      }
    },
    onSettled: () => {
      // Siempre invalidar para asegurar la data fresca
      queryClient.invalidateQueries(["proveedores"]);
    },
  });
}
