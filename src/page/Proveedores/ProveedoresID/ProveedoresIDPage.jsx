import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";
import { useProveedorPayments } from "@/contexts/ProveedorOPContext";
import { useProveedorCompras } from "@/contexts/ProveedorOCContext";
import { useProveedor } from "@/contexts/ProveedorContext";
import { useProveedorArticles } from "@/contexts/ProveedorArticlesContext";

import ProveedorAccordionContainer from "@/components/proveedores/proveedor/ProveedorAccordionContainer";
export default function ProveedoresIDPage() {
  const params = useParams();
  const idProveedor = Number(params.id);

  // Obtener proveedor individual (del contexto o vía fetch si no está)
  const { proveedor, loading } = useProveedor(idProveedor);

  // Otros contextos
  const { getInvoicesForProveedor, refreshProveedorInvoices } =
    useProveedorInvoices();
  const {
    getPaymentsForProveedor,
    getPaymentItemsForProveedor,
    refreshProveedorPayments,
  } = useProveedorPayments();
  const { getComprasForProveedor, refreshProveedorCompras } =
    useProveedorCompras();
  const { getArticlesForProveedor, loadArticlesByProveedor } =
    useProveedorArticles();

  // Cargar artículos y pagos al montar
  useEffect(() => {
    if (idProveedor) {
      refreshProveedorPayments(idProveedor);
      loadArticlesByProveedor(idProveedor);
    }
  }, [idProveedor]);

  const invoices = useMemo(
    () => getInvoicesForProveedor(idProveedor),
    [getInvoicesForProveedor, idProveedor]
  );

  const payments = getPaymentsForProveedor(idProveedor);
  const paymentItems = getPaymentItemsForProveedor(idProveedor);
  const compras = getComprasForProveedor(idProveedor);
  const articles = getArticlesForProveedor(idProveedor);

  useEffect(() => {
    if (invoices.length === 0) {
      refreshProveedorInvoices(idProveedor);
    }
    if (payments.length === 0) {
      refreshProveedorPayments(idProveedor);
    }
    if (!compras.length) {
      refreshProveedorCompras(idProveedor);
    }
  }, [idProveedor]);

  if (loading) return <div className="p-6">Cargando proveedor...</div>;
  if (!proveedor) return <div className="p-6">Proveedor no encontrado.</div>;

  const paymentItemsValidos = paymentItems.filter(
    (item) => typeof item.id_pago === "number"
  );

  return (
    <ProveedorAccordionContainer
      currentProveedores={proveedor}
      invoices={invoices}
      payments={payments}
      paymentItems={paymentItemsValidos}
      articles={articles}
    />
  );
}
