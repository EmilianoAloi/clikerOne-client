import { useMutation } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useEliminarOP = () =>
  useMutation({
    mutationFn: async (idPago) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`,
        method: "DELETE",
      });
    },
  });
