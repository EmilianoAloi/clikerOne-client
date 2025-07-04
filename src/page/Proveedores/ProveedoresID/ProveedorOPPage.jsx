import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/utils/useProveedores";

import ProveedorOPcontainer from "@/components/proveedores/proveedor/opPage/ProveedorOPcontainer";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedorOPPage() {
  const { id } = useParams();
  const { proveedores } = useProveedores();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // 1. Buscar en el contexto primero
    const found = proveedores?.find(
      (p) => String(p.id_proveedor) === String(id)
    );
    if (found) {
      setProveedor(found);
      setLoading(false);
      return;
    }

    // 2. Si no está, buscarlo por fetch
    const fetchProveedor = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/proveedores/${id}`);
        if (!res.ok) throw new Error("Proveedor no encontrado");
        const data = await res.json();
        setProveedor(data);
      } catch (err) {
        console.error("Error al buscar proveedor:", err);
        setProveedor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProveedor();
  }, [id, proveedores]);

  if (loading) return <div className="p-4">Cargando proveedor...</div>;
  if (!id || isNaN(Number(id)))
    return <div>Error: ID de proveedor no válido</div>;
  if (!proveedor) return <div>Error: proveedor no encontrado</div>;

  return <ProveedorOPcontainer proveedor={proveedor} modo="nuevo" />;
}
