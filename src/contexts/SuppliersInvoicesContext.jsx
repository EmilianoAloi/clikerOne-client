import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/proveedores/facturas`;

const SupplierInvoicesContext = createContext(undefined);

export const SupplierInvoicesProvider = ({ children }) => {
  const [invoicesByProveedor, setInvoicesByProveedor] = useState({});

  const getInvoicesForProveedor = (idProveedor) =>
    invoicesByProveedor[idProveedor] || [];

  const refreshSupplierInvoices = async (idProveedor, force = false) => {
    if (!idProveedor) {
      console.warn("refreshSupplierInvoices: idProveedor no válido");
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
      console.error("Error al obtener facturas:", error);
      toast.error("Error al obtener las facturas del proveedor.");
      setInvoicesByProveedor((prev) => ({
        ...prev,
        [idProveedor]: [],
      }));
    }
  };

  return (
    <SupplierInvoicesContext.Provider
      value={{
        invoicesByProveedor,
        getInvoicesForProveedor,
        refreshSupplierInvoices,
      }}
    >
      {children}
    </SupplierInvoicesContext.Provider>
  );
};

export const useSupplierInvoices = () => {
  const context = useContext(SupplierInvoicesContext);
  if (!context)
    throw new Error(
      "useSupplierInvoices debe usarse dentro de un SupplierInvoicesProvider"
    );
  return context;
};
