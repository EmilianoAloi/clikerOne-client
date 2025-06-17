import ProveedorNCform from "./ProveedorNCform";
import ProveedorNCtitle from "./ProveedorNCtitle";

const ProveedorNCcontainer = ({ proveedor }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorNCtitle
        nombreProveedor={proveedor.nombre ?? "Proveedor sin nombre"}
      />
      <ProveedorNCform proveedor={proveedor} />
    </div>
  );
};

export default ProveedorNCcontainer;
