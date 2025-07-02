import ProveedoresTitle from "./Proveedor";
import ProveedoresTable from "./ProveedorTable";

const ProveedorContainer = () => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 my-2 !mb-30 p-6 space-y-6">
      <ProveedoresTitle />

      <ProveedoresTable />
    </div>
  );
};

export default ProveedorContainer;
