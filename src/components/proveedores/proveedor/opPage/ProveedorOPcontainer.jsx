import ProveedorOPtitle from "./ProveedorOPtitle";
import ProveedorOPform from "./ProveedorOPform";

export default function ProveedorOPcontainer({
  modo,
  idProveedor,
  idProveedorCliker,
}) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorOPtitle modo={modo} />
      <ProveedorOPform
        idProveedor={idProveedor}
        modo={modo}
        idProveedorCliker={idProveedorCliker}
      />
    </div>
  );
}
