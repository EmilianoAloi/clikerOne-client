import NCeditForm from "./NCeditForm";
import NCeditTitle from "./NCeditTitle";

const NCeditContainer = ({ proveedor, notaCredito }) => {
  console.log("NCeditContainer render - proveedor:", proveedor);
  console.log("NCeditContainer render - notaCredito:", notaCredito);
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <NCeditTitle
        nombreProveedor={proveedor?.nombre || "Proveedor sin nombre"}
      />
      <NCeditForm proveedor={proveedor} notaCredito={notaCredito} />
    </div>
  );
};

export default NCeditContainer;
