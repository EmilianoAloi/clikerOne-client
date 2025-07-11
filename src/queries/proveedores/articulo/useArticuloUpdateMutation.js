// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { mutationFetchWithAuth } from "@/lib/utils";

// export const useArticuloUpdateMutation = (idProveedor) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (articulo) => {
//       return mutationFetchWithAuth({
//         url: `${
//           import.meta.env.VITE_API_URL
//         }/api/proveedores/articulos/${idProveedor}/articulos/${
//           articulo.id_articulo
//         }`,
//         method: "PUT",
//         body: {
//           ...articulo,
//           precio_unitario: Number(articulo.precio_unitario),
//           id_proveedor: idProveedor,
//         },
//       });
//     },

//     onSuccess: () => {
//       toast.success("Artículo actualizado correctamente");
//       queryClient.invalidateQueries([
//         `${
//           import.meta.env.VITE_API_URL
//         }/api/proveedores/articulos/proveedor/${idProveedor}`,
//       ]);
//     },

//     onError: (err) => {
//       toast.error(err.message || "No se pudo actualizar el artículo");
//     },
//   });
// };

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mutationFetchWithAuth } from "@/lib/utils";

export const useArticuloUpdateMutation = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Desestructuramos id_articulo para usarlo en la URL,
    // y el resto de campos van en el body
    mutationFn: async ({ id_articulo, ...articulo }) => {
      return mutationFetchWithAuth({
        url: `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/${idProveedor}/articulos/${id_articulo}`,
        method: "PUT",
        body: {
          ...articulo,
          precio_unitario: Number(articulo.precio_unitario),
          id_proveedor: idProveedor,
        },
      });
    },

    onSuccess: () => {
      toast.success("Artículo actualizado correctamente");
      // Invalidamos la query de artículos por proveedor
      queryClient.invalidateQueries(["getArticulosByProveedor", idProveedor]);
    },

    onError: (err) => {
      toast.error(err.message || "No se pudo actualizar el artículo");
    },
  });
};
