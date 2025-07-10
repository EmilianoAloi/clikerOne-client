import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export function useUpdateFactura() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/proveedores/facturas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) {
        // Propaga el mensaje de error que venga del backend
        throw new Error(payload.error || "Error al actualizar factura");
      }
      return payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facturas"] });
    },
  });
}
