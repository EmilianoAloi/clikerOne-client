import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeFacturaApi = async (idFactura) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const res = await fetch(`${BASE_URL}/api/proveedores/facturas/${idFactura}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar factura");
  return await res.json();
};

export const useRemoveFactura = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFacturaApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          `${
            import.meta.env.VITE_API_URL
          }/api/proveedores/facturas/proveedor/${idProveedor}`,
        ],
      });
      queryClient.invalidateQueries({ queryKey: ["proveedores"] });
    },
  });
};
