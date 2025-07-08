import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

// Orden de Pago por ID
export const useOPById = (idPago) =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idPago,
  });
