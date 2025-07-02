import { useParams } from "react-router-dom";
import ProveedorInvoiceViewContainer from "@/components/proveedores/proveedor/invoicePage/invoiceview/ProveedorInvoiceViewContainer";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";

export default function ProveedorInvoiceViewPage() {
  const { idFactura } = useParams();
  const { data: factura, isLoading, error } = useFacturaById(idFactura);

  if (isLoading) return <div>Cargando factura...</div>;
  if (error || !factura) return <div>Factura no encontrada</div>;

  return <ProveedorInvoiceViewContainer factura={factura} />;
}
