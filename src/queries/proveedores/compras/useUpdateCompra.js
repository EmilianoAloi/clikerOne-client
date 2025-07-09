import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useUpdateCompra = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/compras/${id}`,
        method: "PUT",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
