import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

/**
 * Hook para crear uno o varios artículos usando el endpoint bulk del backend.
 *
 * @param {number} idProveedor - ID del proveedor al que se asocian los artículos (solo para invalidar cache).
 */
export const useCreateArticuloMutation = (idProveedor) => {
  const queryClient = useQueryClient();

  return useMutation({
    // Espera un array de artículos
    mutationFn: async (articulos) => {
      // Nos aseguramos que precio_unitario sea número (evitás errores de Sequelize)
      const articulosFormateados = articulos.map((a) => ({
        ...a,
        precio_unitario: Number(a.precio_unitario),
      }));

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/proveedores/articulos/bulk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articulos: articulosFormateados }),
        }
      );

      const text = await res.text();
      console.log("Respuesta status:", res.status, "body:", text);

      if (!res.ok) {
        throw new Error(text || "Error al crear artículo");
      }
      return text ? JSON.parse(text) : {};
    },

    onSuccess: () => {
      toast.success("Artículo(s) agregado(s) correctamente");
      // Refresca los artículos del proveedor
      queryClient.invalidateQueries(["articulos", idProveedor]);
    },

    onError: (err) => {
      toast.error(err.message || "No se pudo crear el/los artículo(s)");
    },
  });
};
