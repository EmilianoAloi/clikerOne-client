import SuppliersTitle from "./SuppliersTitle";
import SuppliersTable from "./SuppliersTable";
import { Separator } from "@/components/ui/separator";

const SuppliersContainer = () => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 my-2 !mb-30 p-6 space-y-6">
      <SuppliersTitle />

      <Separator className="space-y-8 !container mx-auto" />

      <SuppliersTable />
    </div>
  );
};

export default SuppliersContainer;
