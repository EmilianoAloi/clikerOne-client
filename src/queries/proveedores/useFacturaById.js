import { useQuery } from "@tanstack/react-query";

export const useFacturaById = (idFactura) =>
  useQuery({
    queryKey: ["factura", idFactura],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/facturas/${idFactura}`
      );
      if (!res.ok) throw new Error("No se pudo cargar la factura");
      return res.json();
    },
    enabled: !!idFactura,
  });
