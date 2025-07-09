import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useCreateCompra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/compras`,
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
