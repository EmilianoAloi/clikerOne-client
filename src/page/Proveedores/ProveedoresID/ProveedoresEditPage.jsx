import { useParams } from "react-router-dom";
import ProveedorEditContainer from "@/components/proveedores/proveedor-edit/ProveedorEditContainer";
import { useProveedor } from "@/contexts/ProveedorContext";

export default function ProveedoresEditPage() {
  const { id } = useParams();
  const { proveedor } = useProveedor(id);

  return <ProveedorEditContainer proveedor={proveedor} />;
}
