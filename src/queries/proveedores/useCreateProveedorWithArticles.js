import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

export function useCreateProveedorWithArticles() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ proveedor, articulos }) => {
      return mutationFetchWithAuth({
        url: API_URL,
        method: "POST",
        body: { proveedor, articulos },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([API_URL]);
    },
  });
}
