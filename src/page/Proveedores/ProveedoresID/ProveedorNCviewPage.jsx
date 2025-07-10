// src/pages/ProveedorNCviewPage.jsx
import { useParams } from "react-router-dom";
import NCviewContainer from "@/components/proveedores/proveedor/ncPage/ncview/NCviewContainer";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";

export default function ProveedorNCviewPage() {
  const { id, idNC } = useParams();
  const { data: notaCredito, isLoading, isError } = useFacturaById(idNC);

  if (isLoading) return <div>Cargando nota de crédito…</div>;
  if (isError || !notaCredito) return <div>Nota de crédito no encontrada.</div>;

  return <NCviewContainer proveedorId={Number(id)} notaCredito={notaCredito} />;
}
