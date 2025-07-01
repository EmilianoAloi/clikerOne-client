import { useParams } from "react-router-dom";
import OCviewContainer from "@/components/proveedores/proveedor/ocPage/ocview/OCviewContainer";
import { useCompraById } from "@/queries/proveedores/useCompraById";

export default function OCIdPage() {
  const { idOC } = useParams();
  const { data: orden, isLoading, error } = useCompraById(idOC);

  if (isLoading) return <div className="p-4">Cargando orden de compra...</div>;
  if (error || !orden)
    return <div className="p-4">Orden de compra no encontrada.</div>;

  return <OCviewContainer orden={orden} />;
}
