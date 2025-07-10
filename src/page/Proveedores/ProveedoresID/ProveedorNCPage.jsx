import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProveedorNCcontainer from "@/components/proveedores/proveedor/ncPage/ProveedorNCcontainer";
import { queryFetchWithAuth } from "@/lib/utils";
import { useProveedores } from "@/queries/proveedores/useProveedores";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedorNCPage() {
  const { id } = useParams();
  const idNum = Number(id);
  if (!id || isNaN(idNum)) return <p>Error: ID de proveedor no válido</p>;

  const { data: proveedores = [] } = useProveedores();
  const proveedorEnContexto = proveedores.find((p) => p.id_proveedor === idNum);

  const {
    data: proveedor,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["proveedor", idNum],
    queryFn: () => queryFetchWithAuth(`${API_URL}/api/proveedores/${idNum}`),
    initialData: proveedorEnContexto,
    enabled: !proveedorEnContexto,
  });

  if (isLoading) return <p>Cargando proveedor...</p>;
  if (error || !proveedor) return <p>Error: proveedor no encontrado</p>;

  return <ProveedorNCcontainer proveedor={proveedor} />;
}
