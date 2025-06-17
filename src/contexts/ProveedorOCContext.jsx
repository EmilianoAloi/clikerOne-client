import { createContext, useContext, useState, useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ProveedorComprasContext = createContext(undefined);

export const ProveedorComprasProvider = ({ children }) => {
  const [comprasByProveedor, setComprasByProveedor] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refresca las compras de un proveedor (cachea)
  const refreshProveedorCompras = useCallback(
    async (idProveedor, force = false) => {
      setLoading(true);
      setError(null);

      if (comprasByProveedor[idProveedor] && !force) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(
          `${API_URL}/api/proveedores/compras/proveedor/${idProveedor}`
        );
        if (!res.ok) throw new Error("No se pudieron cargar las compras");
        const data = await res.json();
        setComprasByProveedor((prev) => ({
          ...prev,
          [idProveedor]: data,
        }));
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Error al buscar compras";
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

  // Devuelve todas las compras para un proveedor (cache)
  const getComprasForProveedor = (idProveedor) =>
    comprasByProveedor[idProveedor] || [];

  // Trae TODAS las compras del sistema (sin cache)
  const getAllCompras = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/proveedores/compras/all`);
      if (!res.ok) throw new Error("No se pudieron cargar las compras");
      const data = await res.json();
      return data; // array de compras
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Error al buscar compras";
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Trae una compra por ID (sin cache, podés cachear si querés)
  const getCompraById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      // RUTA CORRECTA!
      const res = await fetch(`${API_URL}/api/proveedores/compras/${id}`);
      if (!res.ok) throw new Error("Compra no encontrada");
      const data = await res.json();
      return data;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al buscar compra";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear compra
  const createCompra = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/proveedores/compras/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo crear la compra");
      const nueva = await res.json();
      // Podrías actualizar comprasByProveedor según nueva.id_proveedor
      return nueva;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Error al crear compra";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Editar compra
  const updateCompra = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/proveedores/compras/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo modificar la compra");
      const updated = await res.json();
      return updated;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Error al modificar compra";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Borrar compra
  const deleteCompra = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/proveedores/compras/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("No se pudo eliminar la compra");
      return true;
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Error al eliminar compra";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ProveedorComprasContext.Provider
      value={{
        comprasByProveedor,
        getComprasForProveedor,
        refreshProveedorCompras,
        getAllCompras,
        getCompraById,
        createCompra,
        updateCompra,
        deleteCompra,
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
