import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { useProveedores } from "./ProveedorContext";

const API_BASE = `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`;

const ProveedorOPContext = createContext(undefined);

export function normalizePaymentPayload({
  items,
  idProveedor,
  observaciones,
  archivos,
  facturas,
  usuarioId = 1,
  idEmpresa = 1,
}) {
  const now = new Date().toISOString();

  // Usar la fecha del primer ítem como base para la orden
  const fecha = items[0]?.fecha ? new Date(items[0].fecha) : new Date();

  // Calcular el monto total de la orden de pago
  const totalMonto = items.reduce((acc, item) => acc + (item.monto ?? 0), 0);

  // Una sola orden de pago (proveedor_pago)
  const pagos = [
    {
      id_proveedor: idProveedor,
      numero_comprobante: "",
      fecha: fecha.toISOString().slice(0, 10),
      fecha_pago: fecha.toISOString().slice(0, 10),
      fecha_ejecucion: fecha.toISOString().slice(0, 10),
      medio: "",
      banco: "",
      monto: totalMonto,
      estado_pago: "pendiente",
      estado_factura: "sin_factura",
      observaciones,
      fecha_creada: now,
      creado_por: usuarioId,
      modificado_por: usuarioId,
      fecha_modificacion: now,
      sync_origen: "manual",
      estado_logico: 1,
      id_empresa: idEmpresa,
      tipo_id_empresa: "manual",
      tipo_documento: "orden_pago",
      adjuntos: archivos,
    },
  ];

  return {
    observaciones,
    pagos,
    items,
    facturas,
  };
}

export const ProveedorOPProvider = ({ children }) => {
  const [paymentsByProveedor, setPaymentsByProveedor] = useState({});
  const [paymentItemsByProveedor, setPaymentItemsByProveedor] = useState({});
  const { refreshProveedores } = useProveedores();

  const getPaymentsForProveedor = (idProveedor) =>
    paymentsByProveedor[idProveedor] || [];

  const getPaymentItemsForProveedor = (idProveedor) =>
    paymentItemsByProveedor[idProveedor] || [];

  // Refresca pagos e items por proveedor
  const refreshProveedorPayments = async (idProveedor, force = false) => {
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
      if (!itemsRes.ok) throw new Error("Error al obtener items de pago");
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

  // Crear un solo pago para proveedor
  const createSupplierPayment = async (payment) => {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pagos: [payment] }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al registrar pago.");
        return;
      }

      if (payment.id_proveedor)
        await refreshProveedorPayments(payment.id_proveedor, true);
      await refreshProveedores(true);
    } catch (error) {
      console.error("Error creando pago:", error);
      toast.error("Hubo un problema al registrar el pago.");
    }
  };

  // Crear múltiples pagos (orden de pago con ítems y archivos)
  const createMultipleSupplierPayments = async (
    payload,
    refreshInvoicesCallback
  ) => {
    try {
      console.log("payload al back OP", payload);
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Error al registrar los pagos.");
        return false;
      }

      const idProveedor = payload?.pagos?.[0]?.id_proveedor;
      if (idProveedor) {
        await refreshProveedorPayments(idProveedor, true);
        await refreshProveedores(true);
        if (refreshInvoicesCallback) {
          await refreshInvoicesCallback(idProveedor);
        }
      }

      return true;
    } catch (error) {
      console.error("Error creando pagos:", error);
      toast.error("Hubo un problema al registrar los pagos.");
      return false;
    }
  };

  // Actualizar un pago existente
  const updateSupplierPayment = async (id, payment) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      });

      if (!response.ok) throw new Error("Error al actualizar pago");
      toast.success("Pago actualizado correctamente.");
      if (payment.id_proveedor)
        await refreshProveedorPayments(payment.id_proveedor, true);
      await refreshProveedores(true);
    } catch (error) {
      console.error("Error actualizando pago:", error);
      toast.error("Hubo un problema al actualizar el pago.");
    }
  };

  // Eliminar pago
  const removeSupplierPayment = async (id, idProveedor) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar pago");
      toast.success("Pago eliminado correctamente.");
      if (idProveedor) {
        await refreshProveedorPayments(idProveedor, true);
        await refreshProveedores(true);
      }
    } catch (error) {
      console.error("Error eliminando pago:", error);
      toast.error("Hubo un problema al eliminar el pago.");
    }
  };

  return (
    <ProveedorOPContext.Provider
      value={{
        paymentsByProveedor,
        paymentItemsByProveedor,
        getPaymentsForProveedor,
        getPaymentItemsForProveedor,
        refreshProveedorPayments,
        createSupplierPayment,
        createMultipleSupplierPayments,
        updateSupplierPayment,
        removeSupplierPayment,
        normalizePaymentPayload,
      }}
    >
      {children}
    </ProveedorOPContext.Provider>
  );
};

// Custom hook
export const useProveedorOP = () => {
  const context = useContext(ProveedorOPContext);
  if (!context) {
    throw new Error(
      "useProveedorOP debe usarse dentro de un ProveedorOPProvider"
    );
  }
  return context;
};
