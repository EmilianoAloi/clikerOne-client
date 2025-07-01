// src/queries/proveedores/useCompraById.js
import { useQuery } from "@tanstack/react-query";

export const useCompraById = (idCompra) =>
  useQuery({
    queryKey: ["orden-compra", idCompra],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/compras/${idCompra}`
      );
      if (!res.ok) throw new Error("No se pudo cargar la orden de compra");
      return res.json();
    },
    enabled: !!idCompra,
  });
