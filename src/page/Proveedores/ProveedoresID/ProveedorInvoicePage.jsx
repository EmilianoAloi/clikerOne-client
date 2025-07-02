import { useParams } from "react-router-dom";
import { useProveedor } from "@/queries/proveedores/useProveedor";
import ProveedorInvoiceContainer from "@/components/proveedores/proveedor/invoicePage/ProveedorInvoiceContainer";

export default function ProveedorInvoicePage() {
  const { id } = useParams();
  const { data: proveedor, isLoading, error } = useProveedor(id);

  if (isLoading) return <div className="p-4">Cargando proveedor...</div>;
  if (!id || isNaN(Number(id)))
    return <div>Error: ID de proveedor no válido</div>;
  if (error || !proveedor) return <div>Error: proveedor no encontrado</div>;

  return <ProveedorInvoiceContainer proveedor={proveedor} />;
}
