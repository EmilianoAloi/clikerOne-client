import { useMutation } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useCrearOP = () =>
  useMutation({
    mutationFn: async (data) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`,
        method: "POST",
        body: data,
      });
    },
  });
