import { useParams } from "react-router-dom";
import ProveedorEditContainer from "@/components/proveedores/proveedor-edit/ProveedorEditContainer";
import { useProveedor } from "@/contexts/ProveedorContext";

export default function ProveedoresEditPage() {
  const { id } = useParams();
  const { proveedor, loading } = useProveedor(id);

  // if (loading) {
  //   return <div>Cargando proveedor...</div>;
  // }

  // if (!proveedor) {
  //   return <div>Proveedor no encontrado.</div>;
  // }

  return <ProveedorEditContainer proveedor={proveedor} />;
}
