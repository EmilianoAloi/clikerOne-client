import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSuppliers } from "@/contexts/SuppliersContext";
import SuppliersDetailContainer from "@/components/proveedores/proveedor/SupplierDetailContainer";

export default function SupplierDetailPage() {
  const { id } = useParams();
  const idProveedor = Number(id);

  const { suppliers, refreshSuppliers } = useSuppliers();

  // Buscamos el supplier por id
  const supplier = useMemo(
    () => suppliers.find((s) => s.id_proveedor === idProveedor),
    [suppliers, idProveedor]
  );

  // Si no está, intentamos refrescar
  useEffect(() => {
    if (!supplier) {
      refreshSuppliers();
    }
  }, [supplier, refreshSuppliers]);

  if (!supplier) return <div className="p-6">Proveedor no encontrado.</div>;

  return <SuppliersDetailContainer supplier={supplier} />;
}
