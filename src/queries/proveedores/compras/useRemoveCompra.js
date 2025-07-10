import { mutationFetchWithAuth } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores/compras`;

export function useRemoveCompra() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      mutationFetchWithAuth({
        url: `${API_URL}/${id}`,
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries([API_URL]);
    },
  });
}
