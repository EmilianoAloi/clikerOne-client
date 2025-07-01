import { useQuery } from "@tanstack/react-query";

export const useOPByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["pagos-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/pagos/proveedor/${idProveedor}`
      );
      if (!res.ok) throw new Error("No se pudieron cargar las órdenes de pago");
      return res.json();
    },
    enabled: !!idProveedor,
  });
