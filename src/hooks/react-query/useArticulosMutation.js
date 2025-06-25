import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateArticuloMutation = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (articulo) => {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/api/proveedores/${idProveedor}/articulos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(articulo),
        }
      );
      if (!res.ok) throw new Error("Error al crear artículo");
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Artículo agregado");
      // Refresca los artículos del proveedor (ajustá el key si tu query es diferente)
      queryClient.invalidateQueries(["articulos", idProveedor]);
    },
    onError: (err) => {
      toast.error(err.message || "No se pudo crear el artículo");
    },
  });
};
