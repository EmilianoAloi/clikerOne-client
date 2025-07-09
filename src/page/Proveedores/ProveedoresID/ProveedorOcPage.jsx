import { useParams } from "react-router-dom";
import OCcontainer from "@/components/proveedores/proveedor/ocPage/OCcontainer";
import { useProveedor } from "@/queries/proveedores/useProveedor";

export default function NuevaOrdenCompraPage() {
  const { id } = useParams();
  const { data: proveedor, isLoading, isError, error } = useProveedor(id);

  if (!id || isNaN(Number(id))) return <p>Error: ID de proveedor no válido</p>;

  if (isLoading) return <p>Cargando proveedor...</p>;

  if (isError)
    return <p>Error al obtener proveedor: {error?.message || "Desconocido"}</p>;

  if (!proveedor) return <p>Error: proveedor no encontrado</p>;

  return <OCcontainer proveedor={proveedor} modo="nuevo" compra={null} />;
}
