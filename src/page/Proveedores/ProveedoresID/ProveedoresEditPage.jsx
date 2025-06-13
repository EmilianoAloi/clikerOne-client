import { useParams } from "react-router-dom";
import ProveedorEditContainer from "@/components/proveedores/proveedor-edit/ProveedorEditContainer";
import { useProveedors } from "@/contexts/ProveedorContext";

export default function ProveedoresEditPage() {
  const { id } = useParams();
  const { Proveedors } = useProveedors();

  if (Proveedors && Proveedors[0]) {
  }

  // La búsqueda proveedor by id
  const Proveedor = Proveedors.find(
    (s) => String(s.id_proveedor) === String(id)
  );

  if (!Proveedors || Proveedors.length === 0) {
    return <div>Cargando proveedores...</div>;
  }
  if (!Proveedor) {
    return <div>Proveedor no encontrado.</div>;
  }

  return <ProveedorEditContainer Proveedor={Proveedor} />;
}
