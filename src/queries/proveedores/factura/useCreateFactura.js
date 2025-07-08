import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = import.meta.env.VITE_API_URL;

export function useCreateFactura() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      // --- AGREGADO: leer el token desde localStorage (o desde donde lo guardes) ---
      const token = localStorage.getItem("token"); // o el nombre que uses
      const headers = {
        "Content-Type": "application/json",
        // Solo agregá Authorization si hay token
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(`${API_URL}/api/proveedores/facturas`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error crear factura:", errorText);
        throw new Error(errorText || "Error al crear factura");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["facturas"] });
    },
  });
}
