import ProveedorOPtitle from "../ProveedorOPtitle";
import ProveedorOPform from "../ProveedorOPform";

const ProveedoresOPeditContainer = ({ modo, proveedor, pagoData }) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-6">
      <ProveedorOPtitle modo={"editar"} />
      <ProveedorOPform proveedor={proveedor} modo={modo} pagoData={pagoData} />
    </div>
  );
};

export default ProveedoresOPeditContainer;
