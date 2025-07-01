import { useQuery } from "@tanstack/react-query";

export const useComprasByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["compras-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/compras/proveedor/${idProveedor}`
      );
      if (!res.ok) throw new Error("No se pudieron cargar las compras");
      return res.json();
    },
    enabled: !!idProveedor,
  });
