import ProveedoressTitle from "./Proveedor";
import ProveedoressTable from "./ProveedorTable";
import { Separator } from "@/components/ui/separator";

const ProveedorContainer = () => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 my-2 !mb-30 p-6 space-y-6">
      <ProveedoressTitle />

      <Separator className="space-y-8 !container mx-auto" />

      <ProveedoressTable />
    </div>
  );
};

export default ProveedorContainer;
