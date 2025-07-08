import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeFacturaApi = async (idFactura) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token"); // O donde lo guardes

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
