import InvoiceEditContainer from "@/components/proveedores/proveedor/invoicePage/invoiceEditPage/InvoiceEditContainer";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";
import { useProveedor } from "@/queries/proveedores/useProveedor";
import { useParams } from "react-router-dom";

export default function ProveedoresInvoiceEditPage() {
  const { idFactura } = useParams();

  const {
    data: factura,
    isLoading: facturaLoading,
    error: facturaError,
  } = useFacturaById(idFactura);

  const {
    data: proveedor,
    isLoading: proveedorLoading,
    error: proveedorError,
  } = useProveedor(factura?.id_proveedor);

  if (facturaLoading) return <div>Cargando factura...</div>;
  if (proveedorLoading) return <div>Cargando proveedor...</div>;
  if (facturaError) return <div>Error: {facturaError.message}</div>;
  if (proveedorError) return <div>Error: {proveedorError.message}</div>;

  return <InvoiceEditContainer factura={factura} proveedor={proveedor} />;
}
