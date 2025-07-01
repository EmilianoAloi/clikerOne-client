import { useParams } from "react-router-dom";
import ProveedorDetailContainer from "@/components/proveedores/proveedor/detailPage/ProveedorDetailContainer";
import { useProveedor } from "@/queries/proveedores/useProveedor";
import { useArticulosByProveedor } from "@/queries/proveedores/useArticulosByProveedor";
import { useFacturasByProveedor } from "@/queries/proveedores/useFacturasByProveedor";
import { useOPByProveedor } from "@/queries/proveedores/useOPByProveedor";
import { useComprasByProveedor } from "@/queries/proveedores/useComprasByProveedor";
import { usePagoItemsByProveedor } from "@/queries/proveedores/usePagoItemsByProveedor";

export default function ProveedoresIDPage() {
  const { id } = useParams();
  const idProveedor = Number(id);

  // Queries
  const {
    data: proveedor,
    isLoading: loadingProveedor,
    error: errorProveedor,
  } = useProveedor(idProveedor);
  const {
    data: articulos,
    isLoading: loadingArticulos,
    error: errorArticulos,
  } = useArticulosByProveedor(idProveedor);
  const {
    data: facturas,
    isLoading: loadingFacturas,
    error: errorFacturas,
  } = useFacturasByProveedor(idProveedor);
  const {
    data: ordenesPago,
    isLoading: loadingOP,
    error: errorOP,
  } = useOPByProveedor(idProveedor);
  const {
    data: compras,
    isLoading: loadingCompras,
    error: errorCompras,
  } = useComprasByProveedor(idProveedor);

  const {
    data: paymentItems,
    isLoading: loadingPaymentItems,
    error: errorPaymentItems,
  } = usePagoItemsByProveedor(idProveedor);

  // Render

  if (loadingProveedor) return <div className="p-6">Cargando proveedor...</div>;
  if (errorProveedor)
    return <div className="p-6">Error al cargar proveedor.</div>;
  if (!proveedor) return <div className="p-6">Proveedor no encontrado.</div>;

  return (
    <ProveedorDetailContainer
      currentProveedores={proveedor}
      articles={articulos || []}
      invoices={facturas || []}
      payments={ordenesPago || []}
      compras={compras || []}
      paymentItems={paymentItems || []}
      loadingPaymentItems={loadingPaymentItems}
      errorPaymentItems={errorPaymentItems}
      loadingArticulos={loadingArticulos}
      errorArticulos={errorArticulos}
      loadingFacturas={loadingFacturas}
      errorFacturas={errorFacturas}
      loadingOP={loadingOP}
      errorOP={errorOP}
      loadingCompras={loadingCompras}
      errorCompras={errorCompras}
    />
  );
}
