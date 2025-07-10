import { useParams } from "react-router-dom";
import OCcontainer from "@/components/proveedores/proveedor/ocPage/OCcontainer";
import { useCompraById } from "@/queries/proveedores/compras/useCompraById";
import { useProveedores } from "@/queries/proveedores/useProveedores";

export default function ProveedorOCeditPage() {
  const { id, idOC } = useParams();
  const { data: proveedores = [], isLoading: loadingProveedores } =
    useProveedores();

  const { data: ordenCompra, error, isLoading } = useCompraById(idOC);

  // Mostrá loading si los proveedores aún no están listos
  if (loadingProveedores || !proveedores || proveedores.length === 0)
    return <div>Cargando proveedores...</div>;
  if (isLoading) return <div>Cargando orden de compra...</div>;

  const proveedor = proveedores.find(
    (p) => String(p.id_proveedor) === String(id)
  );

  if (!proveedor) return <div>Proveedor no encontrado.</div>;
  if (error)
    return <div style={{ color: "red" }}>Error: {error.message || error}</div>;
  if (!ordenCompra) return <div>Orden de compra no encontrada.</div>;

  return (
    <OCcontainer proveedor={proveedor} modo="editar" compra={ordenCompra} />
  );
}
