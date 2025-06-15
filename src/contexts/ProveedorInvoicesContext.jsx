import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/proveedores/facturas`;

const ProveedorInvoicesContext = createContext(undefined);

export const ProveedorInvoicesProvider = ({ children }) => {
  const [invoicesByProveedor, setInvoicesByProveedor] = useState({});

  const getInvoicesForProveedor = (idProveedor) =>
    invoicesByProveedor[idProveedor] || [];

  const refreshProveedorInvoices = async (idProveedor, force = false) => {
    if (!idProveedor) {
      console.warn("⚠️ refreshProveedorInvoices: idProveedor no válido");
      return;
    }

    if (invoicesByProveedor[idProveedor] && !force) return;

    try {
      const response = await fetch(`${API_BASE}/proveedor/${idProveedor}`);
      if (!response.ok) throw new Error("Error al obtener facturas");
      const data = await response.json();
      setInvoicesByProveedor((prev) => ({
        ...prev,
        [idProveedor]: data,
      }));
    } catch (error) {
      console.error("❌ Error al obtener facturas:", error);
      toast.error("Error al obtener las facturas del proveedor.");
      setInvoicesByProveedor((prev) => ({
        ...prev,
        [idProveedor]: [],
      }));
    }
  };

  return (
    <ProveedorInvoicesContext.Provider
      value={{
        invoicesByProveedor,
        getInvoicesForProveedor,
        refreshProveedorInvoices,
      }}
    >
      {children}
    </ProveedorInvoicesContext.Provider>
  );
};

export const useProveedorInvoices = () => {
  const context = useContext(ProveedorInvoicesContext);
  if (!context) {
    throw new Error(
      "useProveedorInvoices debe usarse dentro de un ProveedorInvoicesProvider"
    );
  }
  return context;
};
