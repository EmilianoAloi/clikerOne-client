import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useCrearOP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`,
        method: "POST",
        body: data,
      });
    },
    onSuccess: (result, variables) => {
      // Asegurate que en el payload mandás idProveedor
      const idProveedor = variables.idProveedor;
      if (!idProveedor) return;

      // Refresca queries relacionadas
      queryClient.invalidateQueries({
        queryKey: [
          `${
            import.meta.env.VITE_API_URL
          }/api/proveedores/pagos/proveedor/${idProveedor}`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `${import.meta.env.VITE_API_URL}/api/proveedores/${idProveedor}`,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `${
            import.meta.env.VITE_API_URL
          }/api/proveedores/pagos/proveedor/${idProveedor}/items`,
        ],
      });
    },
  });
};
