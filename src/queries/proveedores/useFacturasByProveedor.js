import { useQuery } from "@tanstack/react-query";

export const useFacturasByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["facturas-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/facturas/proveedor/${idProveedor}`
      );
      if (!res.ok) throw new Error("No se pudieron cargar las facturas");
      return res.json();
    },
    enabled: !!idProveedor,
  });
