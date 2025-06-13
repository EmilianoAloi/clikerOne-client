import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom"; // Usar react-router-dom en vez de next/navigation

import { useSupplierInvoices } from "@/contexts/SuppliersInvoicesContext";
import { useSupplierPayments } from "@/contexts/SuppliersOPContext";
import { useSupplierCompras } from "@/contexts/SuppliersOCContext";
import { useSuppliers } from "@/contexts/SuppliersContext";
import SuppliersDetailContainer from "@/components/proveedores/proveedor/SupplierDetailContainer";

export default function SupplierDetailPage() {
  const params = useParams();
  const idProveedor = Number(params.id);

  // Contextos
  const { suppliers, refreshSuppliers } = useSuppliers();
  const { getInvoicesForProveedor, refreshSupplierInvoices } =
    useSupplierInvoices();
  const {
    getPaymentsForProveedor,
    getPaymentItemsForProveedor,
    refreshSupplierPayments,
  } = useSupplierPayments();
  const { getComprasForProveedor, refreshSupplierCompras } =
    useSupplierCompras();

  useEffect(() => {
    if (idProveedor) refreshSupplierPayments(idProveedor);
  }, [idProveedor]);

  const payments = getPaymentsForProveedor(idProveedor);
  const paymentItems = getPaymentItemsForProveedor(idProveedor);
  const compras = getComprasForProveedor(idProveedor);

  // Buscar proveedor en el contexto primero
  const supplier = useMemo(
    () => suppliers.find((s) => s.id_proveedor === idProveedor),
    [suppliers, idProveedor]
  );

  // Facturas y pagos de este proveedor
  const invoices = useMemo(
    () => getInvoicesForProveedor(idProveedor),
    [getInvoicesForProveedor, idProveedor]
  );

  // LOG para entender el ciclo de vida
  useEffect(() => {
    if (supplier) {
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
  }, [supplier, invoices, payments, compras, idProveedor]);

  // Refrescar si no hay datos
  useEffect(() => {
    if (!supplier) {
      console.log("➡️ Haciendo fetch de proveedores...");
      refreshSuppliers();
    }
    if (invoices.length === 0) {
      console.log("➡️ Haciendo fetch de facturas...");
      refreshSupplierInvoices(idProveedor);
    }
    if (payments.length === 0) {
      console.log("➡️ Haciendo fetch de pagos...");
      refreshSupplierPayments(idProveedor);
    }
    if (!compras.length) {
      console.log("➡️ Haciendo fetch de compras...");
      refreshSupplierCompras(idProveedor);
    }
    return () => {
      console.log("♻️ SupplierDetailPage UNMOUNTED");
    };
  }, [idProveedor]);

  // Validar que supplier exista
  if (!supplier) return <div className="p-6">Proveedor no encontrado.</div>;

  // Filtra sólo los items válidos
  const paymentItemsValidos = paymentItems.filter(
    (item) => typeof item.id_pago === "number"
  );

  return (
    <SuppliersDetailContainer
      supplier={supplier}
      invoices={invoices}
      payments={payments}
      paymentItems={paymentItemsValidos}
      compras={compras}
    />
  );
}
