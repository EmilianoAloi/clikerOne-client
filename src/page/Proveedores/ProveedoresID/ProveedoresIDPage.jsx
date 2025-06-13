import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom"; // Usar react-router-dom en vez de next/navigation

import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";
import { useProveedorPayments } from "@/contexts/ProveedorOPContext";
import { useProveedorCompras } from "@/contexts/ProveedorOCContext";
import { useProveedors } from "@/contexts/ProveedorContext";

export default function ProveedoresIDPage() {
  const params = useParams();
  const idProveedor = Number(params.id);

  // Contextos
  const { Proveedors, refreshProveedors } = useProveedors();
  const { getInvoicesForProveedor, refreshProveedorInvoices } =
    useProveedorInvoices();
  const {
    getPaymentsForProveedor,
    getPaymentItemsForProveedor,
    refreshProveedorPayments,
  } = useProveedorPayments();
  const { getComprasForProveedor, refreshProveedorCompras } =
    useProveedorCompras();

  useEffect(() => {
    if (idProveedor) refreshProveedorPayments(idProveedor);
  }, [idProveedor]);

  const payments = getPaymentsForProveedor(idProveedor);
  const paymentItems = getPaymentItemsForProveedor(idProveedor);
  const compras = getComprasForProveedor(idProveedor);

  // Buscar proveedor en el contexto primero
  const Proveedor = useMemo(
    () => Proveedors.find((s) => s.id_proveedor === idProveedor),
    [Proveedors, idProveedor]
  );

  // Facturas y pagos de este proveedor
  const invoices = useMemo(
    () => getInvoicesForProveedor(idProveedor),
    [getInvoicesForProveedor, idProveedor]
  );

  // LOG para entender el ciclo de vida
  useEffect(() => {
    if (Proveedor) {
      console.log(`✅ Proveedor ${idProveedor} encontrado en contexto.`);
    } else {
      console.log(`🔍 Proveedor ${idProveedor} NO encontrado en contexto.`);
    }
    if (invoices.length === 0)
      console.log(
        `❌ No hay facturas en contexto para proveedor ${idProveedor}`
      );
    if (payments.length === 0)
      console.log(`❌ No hay pagos en contexto para proveedor ${idProveedor}`);
    if (!compras.length)
      console.log(
        `❌ No hay compras en contexto para proveedor ${idProveedor}`
      );
  }, [Proveedor, invoices, payments, compras, idProveedor]);

  // Refrescar si no hay datos
  useEffect(() => {
    if (!Proveedor) {
      console.log("➡️ Haciendo fetch de proveedores...");
      refreshProveedors();
    }
    if (invoices.length === 0) {
      console.log("➡️ Haciendo fetch de facturas...");
      refreshProveedorInvoices(idProveedor);
    }
    if (payments.length === 0) {
      console.log("➡️ Haciendo fetch de pagos...");
      refreshProveedorPayments(idProveedor);
    }
    if (!compras.length) {
      console.log("➡️ Haciendo fetch de compras...");
      refreshProveedorCompras(idProveedor);
    }
    return () => {
      console.log("♻️ ProveedorDetailPage UNMOUNTED");
    };
  }, [idProveedor]);

  // Validar que Proveedor exista
  if (!Proveedor) return <div className="p-6">Proveedor no encontrado.</div>;

  // Filtra sólo los items válidos
  const paymentItemsValidos = paymentItems.filter(
    (item) => typeof item.id_pago === "number"
  );

  return (
    <ProveedoresIDPage
      Proveedor={Proveedor}
      invoices={invoices}
      payments={payments}
      paymentItems={paymentItemsValidos}
      compras={compras}
    />
  );
}
