import ProveedorNDform from "./ProveedorNDform";
import ProveedorNDtitle from "./ProveedorNDtitle";

const SupplierDebitoContainer = ({ proveedor }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorNDtitle
        nombreProveedor={proveedor.nombre ?? "Proveedor sin nombre"}
      />
      <ProveedorNDform proveedor={proveedor} />
    </div>
  );
};

export default SupplierDebitoContainer;
