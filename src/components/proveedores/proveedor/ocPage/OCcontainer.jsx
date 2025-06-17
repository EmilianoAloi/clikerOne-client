import OcForm from "./OcForm";
import OCtitle from "./OCtitle";

export default function OCcontainer({ proveedor, modo, compra }) {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <OCtitle isEditar={modo === "editar"} />
      <OcForm proveedor={proveedor} modo={modo} compra={compra} />
    </div>
  );
}
