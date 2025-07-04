import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProveedoresEditTitle from "./ProveedorEditTitle";
import ProveedoresEditForm from "./ProveedorEditForm";

const ProveedorEditContainer = ({ proveedor }) => {
  const [proveedorData, setProveedorData] = useState(proveedor);

  useEffect(() => {
    if (proveedor) {
      setProveedorData(proveedor);
    }
  }, [proveedor]);

  if (!proveedorData) {
    return (
      <div className="p-6">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm mx-6 mt-2 mb-10">
      <ProveedoresEditTitle />
      <ProveedoresEditForm
        proveedor={proveedorData}
        articulos={proveedorData.articulos}
      />
    </div>
  );
};

export default ProveedorEditContainer;
