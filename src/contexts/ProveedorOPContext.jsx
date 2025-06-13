import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`;

const SuppliersOPContext = createContext(undefined);

export const SupplierPaymentsProvider = ({ children }) => {
  const [paymentsByProveedor, setPaymentsByProveedor] = useState({});
  const [paymentItemsByProveedor, setPaymentItemsByProveedor] = useState({});

  const getPaymentsForProveedor = (idProveedor) =>
    paymentsByProveedor[idProveedor] || [];
  const getPaymentItemsForProveedor = (idProveedor) =>
    paymentItemsByProveedor[idProveedor] || [];

  const refreshSupplierPayments = async (idProveedor, force = false) => {
    if (!idProveedor) return;
    if (paymentsByProveedor[idProveedor] && !force) return;
    try {
      const pagosRes = await fetch(`${API_BASE}/proveedor/${idProveedor}`);
      if (!pagosRes.ok) throw new Error("Error al obtener pagos");
      const pagosData = await pagosRes.json();

      setPaymentsByProveedor((prev) => ({
        ...prev,
        [idProveedor]: pagosData,
      }));

      const itemsRes = await fetch(
        `${API_BASE}/proveedor/${idProveedor}/items`
      );
      const itemsData = await itemsRes.json();
      setPaymentItemsByProveedor((prev) => ({
        ...prev,
        [idProveedor]: itemsData,
      }));
    } catch (error) {
      console.error("❌ Error refrescando pagos:", error);
      toast.error("Error al obtener pagos del proveedor.");
      setPaymentsByProveedor((prev) => ({
        ...prev,
        [idProveedor]: [],
      }));
      setPaymentItemsByProveedor((prev) => ({
        ...prev,
        [idProveedor]: [],
      }));
    }
  };

  return (
    <SuppliersOPContext.Provider
      value={{
        paymentsByProveedor,
        paymentItemsByProveedor,
        getPaymentsForProveedor,
        getPaymentItemsForProveedor,
        refreshSupplierPayments,
        // Agregá más funciones CRUD si lo necesitás
      }}
    >
      {children}
    </SuppliersOPContext.Provider>
  );
};

export const useSupplierPayments = () => {
  const context = useContext(SuppliersOPContext);
  if (!context)
    throw new Error(
      "useSupplierPayments debe usarse dentro de un SupplierPaymentsProvider"
    );
  return context;
};
