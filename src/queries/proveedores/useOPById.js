import { useQuery } from "@tanstack/react-query";

export const useOPById = (idPago) =>
  useQuery({
    queryKey: ["orden-pago", idPago],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/pagos/${idPago}`
      );
      if (!res.ok) throw new Error("No se pudo cargar la orden de pago");
      return res.json();
    },
    enabled: !!idPago,
  });
