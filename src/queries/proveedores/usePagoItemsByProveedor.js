import { useQuery } from "@tanstack/react-query";

export const usePagoItemsByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["pago-items-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/pagos/proveedor/${idProveedor}/items`
      );
      if (!res.ok) throw new Error("No se pudieron cargar los ítems de pago");
      return res.json();
    },
    enabled: !!idProveedor,
  });
