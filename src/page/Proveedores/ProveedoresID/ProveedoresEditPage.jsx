import { useParams } from "react-router-dom";
import ProveedorEditContainer from "@/components/proveedores/proveedor-edit/ProveedorEditContainer";
import { useSuppliers } from "@/contexts/ProveedorContext";

export default function ProveedoresEditPage() {
  const { id } = useParams();
  const { suppliers } = useSuppliers();

  if (suppliers && suppliers[0]) {
  }

  // La búsqueda proveedor by id
  const supplier = suppliers.find((s) => String(s.id_proveedor) === String(id));

  if (!suppliers || suppliers.length === 0) {
    return <div>Cargando proveedores...</div>;
  }
  if (!supplier) {
    return <div>Proveedor no encontrado.</div>;
  }

  return <ProveedorEditContainer supplier={supplier} />;
}
