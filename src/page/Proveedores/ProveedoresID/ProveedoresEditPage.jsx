import { useParams } from "react-router-dom";
import ProveedorEditContainer from "@/components/proveedores/proveedor-edit/ProveedorEditContainer";
import { useProveedor } from "@/queries/proveedores/useProveedor";

export default function ProveedoresEditPage() {
  const { id } = useParams();
  const idProveedor = Number(id);

  const { data: proveedor, isLoading } = useProveedor(idProveedor);

  if (isLoading) return <div className="p-6">Cargando proveedor...</div>;
  if (!proveedor) return <div className="p-6">Proveedor no encontrado.</div>;

  return <ProveedorEditContainer proveedor={proveedor} />;
}
