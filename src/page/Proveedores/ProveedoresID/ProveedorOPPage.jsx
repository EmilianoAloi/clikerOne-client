import { useParams } from "react-router-dom";
import { useProveedor } from "@/queries/proveedores/useProveedor";
import ProveedorOPcontainer from "@/components/proveedores/proveedor/opPage/ProveedorOPcontainer";

export default function ProveedorOPPage() {
  const { id } = useParams();
  const { data: proveedor, isLoading } = useProveedor(id);

  if (!id || isNaN(Number(id)))
    return <div>Error: ID de proveedor no válido</div>;
  if (isLoading) return <div className="p-4">Cargando proveedor...</div>;
  if (!proveedor) return <div>Error: proveedor no encontrado</div>;

  return <ProveedorOPcontainer proveedor={proveedor} modo="nuevo" />;
}
