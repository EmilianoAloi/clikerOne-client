import { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores`;

const SuppliersOCContext = createContext(undefined);

export const SupplierComprasProvider = ({ children }) => {
  const [comprasByProveedor, setComprasByProveedor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshSupplierCompras = useCallback(
    async (id_proveedor, force = false) => {
      setLoading(true);
      setError(null);
      if (comprasByProveedor[id_proveedor] && !force) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`${API_URL}/compras/proveedor/${id_proveedor}`);
        if (!res.ok) throw new Error("No se pudieron cargar las compras");
        const data = await res.json();
        setComprasByProveedor((prev) => ({
          ...prev,
          [id_proveedor]: data,
        }));
      } catch (e) {
        const errorMsg =
          e instanceof Error ? e.message : "Error al buscar compras";
        setError(errorMsg);
        setComprasByProveedor((prev) => ({
          ...prev,
          [id_proveedor]: [],
        }));
      } finally {
        setLoading(false);
      }
    },
    [comprasByProveedor]
  );

  const getComprasForProveedor = (id_proveedor) =>
    comprasByProveedor[id_proveedor] || [];

  return (
    <SuppliersOCContext.Provider
      value={{
        comprasByProveedor,
        getComprasForProveedor,
        loading,
        error,
        refreshSupplierCompras,
      }}
    >
      {children}
    </SuppliersOCContext.Provider>
  );
};

export const useSupplierCompras = () => {
  const ctx = useContext(SuppliersOCContext);
  if (!ctx)
    throw new Error(
      "useSupplierCompras debe usarse dentro de SupplierComprasProvider"
    );
  return ctx;
};
