import { useParams } from "react-router-dom";
import OPviewContainer from "@/components/proveedores/proveedor/opPage/opview/OPviewContainer";
import { useOPById } from "@/queries/proveedores/pagos/useOPById";

export default function ProveedorOPViewPage() {
  const { idOP } = useParams();
  const { data: pago, isLoading, error } = useOPById(idOP);

  if (isLoading) return <div>Cargando orden de pago...</div>;
  if (error || !pago) return <div>Orden de pago no encontrada</div>;

  return <OPviewContainer pago={pago} />;
}
