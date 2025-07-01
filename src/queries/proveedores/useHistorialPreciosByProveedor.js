import { useQuery } from "@tanstack/react-query";

export const useHistorialPreciosByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["historial-precios-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/historial-precios/proveedor/${idProveedor}`
      );
      if (!res.ok) throw new Error("Error al cargar historial de precios");
      return res.json();
    },
    enabled: !!idProveedor,
  });
