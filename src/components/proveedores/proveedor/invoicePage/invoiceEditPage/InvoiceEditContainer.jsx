import InvoiceEditTitle from "./InvoiceEditTitle";
import ProveedorInvoiceForm from "../ProveedorInvoiceForm";

const InvoiceEditContainer = ({ factura, proveedor }) => {
  // Si alguno no llegó todavía, muestra loading
  if (!factura) return <div>Cargando factura...</div>;
  if (!proveedor) return <div>Cargando proveedor...</div>;

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <InvoiceEditTitle />
      <ProveedorInvoiceForm
        modo="editar"
        factura={factura}
        idProveedor={factura.id_proveedor}
        proveedor={proveedor}
      />
    </div>
  );
};

export default InvoiceEditContainer;
