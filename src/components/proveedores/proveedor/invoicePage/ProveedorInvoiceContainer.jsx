import ProveedorInvoiceForm from "./ProveedorInvoiceForm";
import ProveedorInvoiceTitle from "./ProveedorInvoiceTitle";

export default function ProveedorInvoiceContainer({ proveedor }) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorInvoiceTitle />
      <ProveedorInvoiceForm
        modo="crear"
        idProveedor={proveedor.id_proveedor}
        proveedor={proveedor}
      />
    </div>
  );
}
