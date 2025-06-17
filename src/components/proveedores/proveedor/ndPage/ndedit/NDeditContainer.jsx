import NDeditForm from "./NDeditForm";
import NDeditTitle from "./NDeditTitle";

const NDeditContainer = ({ proveedor, notaDebito }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <NDeditTitle
        nombreProveedor={proveedor?.nombre || "Proveedor sin nombre"}
      />
      <NDeditForm proveedor={proveedor} notaDebito={notaDebito} />
    </div>
  );
};

export default NDeditContainer;
