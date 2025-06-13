import { useParams } from "react-router-dom";
import { useSuppliers } from "@/contexts/SuppliersContext";
import SupplierDetailInfo from "./SupplierDetailInfo";

const SuppliersDetailContainer = ({ supplier: initialSupplier }) => {
  const { id } = useParams();
  const idNum = Number(id);
  const { suppliers } = useSuppliers();
  const currentSupplier =
    suppliers.find((s) => s.id_proveedor === idNum) || initialSupplier;

  if (!currentSupplier) return <p className="p-4">Proveedor no encontrado.</p>;

  return (
    <div className="mx-6 mt-2 mb-4 space-y-8">
      <div className="rounded-lg border text-card-foreground shadow-sm p-6">
        <SupplierDetailInfo supplier={currentSupplier} />
      </div>
    </div>
  );
};

export default SuppliersDetailContainer;
