import { useParams } from "react-router-dom";
import { useProveedores } from "@/utils/useProveedores";
import { useQuery } from "@tanstack/react-query";
import { queryFetchWithAuth } from "@/lib/utils";
import ProveedorOPcontainer from "@/components/proveedores/proveedor/opPage/ProveedorOPcontainer";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedorOPPage() {
  const { id } = useParams();
  const { proveedores } = useProveedores();

  // 1. Buscar en el contexto primero
  const proveedorFromContext = proveedores?.find(
    (p) => String(p.id_proveedor) === String(id)
  );

  // 2. Si no está en contexto, buscá por API usando React Query
  const { data: proveedor, isLoading } = useQuery({
    queryKey: [`${API_URL}/api/proveedores/${id}`],
    queryFn: queryFetchWithAuth,
    enabled: !!id && !proveedorFromContext,
  });

  // Decidí de dónde sacar el proveedor
  const proveedorFinal = proveedorFromContext || proveedor;

  if (!id || isNaN(Number(id)))
    return <div>Error: ID de proveedor no válido</div>;
  if (isLoading) return <div className="p-4">Cargando proveedor...</div>;
  if (!proveedorFinal) return <div>Error: proveedor no encontrado</div>;

  return <ProveedorOPcontainer proveedor={proveedorFinal} modo="nuevo" />;
}
