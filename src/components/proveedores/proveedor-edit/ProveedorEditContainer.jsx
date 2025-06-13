"use client";

import { Skeleton } from "@/components/ui/skeleton";
import SupplierEditTitle from "./ProveedorEditTitle";
import { useSuppliers } from "@/contexts/SuppliersContext";

const ProveedorEditContainer = () => {
  const { getSupplierByID } = useSuppliers();
  const [supplier, setSupplier] =
    (useState < SupplierWithArticulos) | (null > null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      const data = await getSupplierByID(id);
      setSupplier(data);
      setLoading(false);
    };

    fetchSupplier();
  }, [id, getSupplierByID]);

  if (loading || !supplier) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-10">
      <SupplierEditTitle />
      <SupplierEditFormm proveedor={supplier} articulos={supplier.articulos} />
    </div>
  );
};

export default ProveedorEditContainer;
