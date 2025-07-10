import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useCrearOP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) =>
      mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`,
        method: "POST",
        body: payload,
      }),
    onSuccess: (_data, payload) => {
      // 1) Sacamos el id del primer pago
      const idProv = payload.pagos?.[0]?.id_proveedor;
      if (!idProv) return;

      // 2) Invalidamos con keys simples
      queryClient.invalidateQueries(["pagos", idProv]);
      queryClient.invalidateQueries(["pagosItems", idProv]);
      queryClient.invalidateQueries(["proveedor", idProv]);
    },
  });
};
