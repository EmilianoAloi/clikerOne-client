import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

const ProveedorComprasContext = createContext(undefined);

export const ProveedorComprasProvider = ({ children }) => {
  const [comprasByProveedor, setComprasByProveedor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshProveedorCompras = useCallback(
    async (idProveedor, force = false) => {
      setLoading(true);
      setError(null);

      if (comprasByProveedor[idProveedor] && !force) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/compras/proveedor/${idProveedor}`);
        if (!res.ok) throw new Error("No se pudieron cargar las compras");

        const data = await res.json();
        setComprasByProveedor((prev) => ({
          ...prev,
          [idProveedor]: data,
        }));
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Error al buscar compras";
        console.error("❌ Error en refreshProveedorCompras:", e);
        toast.error(message);
        setError(message);
        setComprasByProveedor((prev) => ({
          ...prev,
          [idProveedor]: [],
        }));
      } finally {
        setLoading(false);
      }
    },
    [comprasByProveedor]
  );

  const getComprasForProveedor = (idProveedor) =>
    comprasByProveedor[idProveedor] || [];

  return (
    <ProveedorComprasContext.Provider
      value={{
        comprasByProveedor,
        getComprasForProveedor,
        refreshProveedorCompras,
        loading,
        error,
      }}
    >
      {children}
    </ProveedorComprasContext.Provider>
  );
};

export const useProveedorCompras = () => {
  const context = useContext(ProveedorComprasContext);
  if (!context) {
    throw new Error(
      "useProveedorCompras debe usarse dentro de un ProveedorComprasProvider"
    );
  }
  return context;
};
