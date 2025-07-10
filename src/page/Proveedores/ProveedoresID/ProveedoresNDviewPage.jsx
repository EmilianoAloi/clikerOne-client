// src/pages/ProveedoresNDviewPage.jsx
import { useParams } from "react-router-dom";
import NDviewContainer from "@/components/proveedores/proveedor/ndPage/ndview/NDviewContainer";
import { useFacturaById } from "@/queries/proveedores/factura/useFacturaById";

export default function ProveedoresNDviewPage() {
  const { id, idND } = useParams();
  const { data: notaDebito, isLoading, isError, error } = useFacturaById(idND);

  if (isLoading) return <div>Cargando nota de débito...</div>;
  if (isError)
    return (
      <div className="text-red-500">{error?.message ?? "Error al cargar"}</div>
    );
  if (!notaDebito) return <div>No se encontró la nota de débito.</div>;

  return <NDviewContainer notaDebito={notaDebito} proveedorId={Number(id)} />;
}
