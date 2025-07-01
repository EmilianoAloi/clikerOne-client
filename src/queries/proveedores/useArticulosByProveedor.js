import { useQuery } from "@tanstack/react-query";

export const useArticulosByProveedor = (idProveedor) =>
  useQuery({
    queryKey: ["articulos-proveedor", idProveedor],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/proveedor/${idProveedor}`
      );
      if (!res.ok) throw new Error("No se pudieron cargar los artículos");
      return res.json();
    },
    enabled: !!idProveedor,
  });
