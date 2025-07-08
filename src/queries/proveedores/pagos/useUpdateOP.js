import { useMutation } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useActualizarOP = () =>
  useMutation({
    mutationFn: async ({ idPago, data }) => {
      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`,
        method: "PUT",
        body: data,
      });
    },
  });
