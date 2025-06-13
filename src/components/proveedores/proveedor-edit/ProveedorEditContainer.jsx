import ProveedorEditForm from "./ProveedorEditForm";
import ProveedorEditTitle from "./ProveedorEditTitle";

export default function ProveedorEditContainer({ supplier }) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-10">
      <ProveedorEditTitle />
      {/* PASA articulos directo */}
      <ProveedorEditForm
        proveedor={supplier}
        articulos={supplier.articulos || []}
      />
    </div>
  );
}
