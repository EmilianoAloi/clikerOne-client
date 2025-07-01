import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";

export const useFacturaById = (idFactura) =>
  useQuery({
    queryKey: [
      `${import.meta.env.VITE_API_URL}/api/proveedores/facturas/${idFactura}`,
    ],
    queryFn: queryFetchWithAuth,
    enabled: !!idFactura,
  });
