import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mutationFetchWithAuth } from "@/lib/utils";
export const useCreateArticuloMutation = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articulos) => {
      const articulosFormateados = articulos.map((a) => ({
        ...a,
        precio_unitario: Number(a.precio_unitario),
      }));

      return mutationFetchWithAuth({
        url: `${import.meta.env.VITE_API_URL}/api/proveedores/articulos/bulk`,
        method: "POST",
        body: { articulos: articulosFormateados },
      });
    },

    onSuccess: () => {
      toast.success("Artículo(s) agregado(s) correctamente");
      queryClient.invalidateQueries([
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/articulos/proveedor/${idProveedor}`,
      ]);
    },

    onError: (err) => {
      toast.error(err.message || "No se pudo crear el/los artículo(s)");
    },
  });
};
