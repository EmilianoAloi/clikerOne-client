import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeFacturaApi = async (idFactura) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/api/proveedores/facturas/${idFactura}`, {
    method: "DELETE",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error al eliminar factura");
  return await res.json();
};

export const useRemoveFactura = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFacturaApi,

    // Optimistic Update
    onMutate: async (idFactura) => {
      await queryClient.cancelQueries([
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/facturas/proveedor/${idProveedor}`,
      ]);

      const previousFacturas = queryClient.getQueryData([
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/facturas/proveedor/${idProveedor}`,
      ]);

      // Elimina factura inmediatamente
      queryClient.setQueryData(
        [
          `${
            import.meta.env.VITE_API_URL
          }/api/proveedores/facturas/proveedor/${idProveedor}`,
        ],
        (old = []) => old.filter((f) => f.id_factura !== idFactura)
      );

      return { previousFacturas };
    },

    // Revierte si hay error
    onError: (error, idFactura, context) => {
      queryClient.setQueryData(
        [
          `${
            import.meta.env.VITE_API_URL
          }/api/proveedores/facturas/proveedor/${idProveedor}`,
        ],
        context.previousFacturas
      );
    },

    // Finalmente refetchea siempre para sincronizar con backend
    onSettled: () => {
      queryClient.invalidateQueries([
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/facturas/proveedor/${idProveedor}`,
      ]);
      queryClient.invalidateQueries(["proveedores"]);
    },
  });
};
