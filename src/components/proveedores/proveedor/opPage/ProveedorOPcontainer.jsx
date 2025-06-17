import ProveedorOPtitle from "./ProveedorOPtitle";
import ProveedorOPform from "./ProveedorOPform";

export default function ProveedorOPcontainer({ modo, proveedor }) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorOPtitle modo={modo} />
      <ProveedorOPform proveedor={proveedor} modo={modo} />
    </div>
  );
}
