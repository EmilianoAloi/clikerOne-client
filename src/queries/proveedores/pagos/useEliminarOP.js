// import { useMutation } from "@tanstack/react-query";
// import { mutationFetchWithAuth } from "@/lib/utils";

// export const useEliminarOP = () =>
//   useMutation({
//     mutationFn: async (idPago) => {
//       return mutationFetchWithAuth({
//         url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`,
//         method: "DELETE",
//       });
//     },
//   });

// src/queries/proveedores/pagos/useEliminarOP.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mutationFetchWithAuth } from "@/lib/utils";
import { toast } from "sonner";

export const useEliminarOP = () => {
  const qc = useQueryClient();

  return useMutation({
    // Recibe un objeto { idPago, idProveedor }
    mutationFn: async ({ idPago }) => {
      const res = await mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`,
        method: "DELETE",
      });
      // Si el backend devuelve error, lo lanzamos para onError
      if (res.error) throw new Error(res.error);
      return idPago;
    },
    onSuccess: (idPago, { idProveedor }) => {
      // Invalidamos las queries de pagos y proveedor
      qc.invalidateQueries(["pagos", idProveedor]);
      qc.invalidateQueries(["pagosItems", idProveedor]);
      qc.invalidateQueries(["proveedor", idProveedor]);
      toast.error("Orden de pago eliminada correctamente.");
    },
  });
};
