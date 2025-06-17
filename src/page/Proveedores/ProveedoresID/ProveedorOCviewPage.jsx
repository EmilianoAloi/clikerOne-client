import OCviewContainer from "@/components/proveedores/proveedor/ocPage/ocview/OCviewContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores/compras`;

export default function OCIdPage() {
  const { idOC } = useParams();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrden = async () => {
      try {
        const res = await fetch(`${API_URL}/${idOC}`);
        if (!res.ok) {
          setOrden(null);
        } else {
          const data = await res.json();
          setOrden(data);
        }
      } catch (error) {
        console.error("Error al obtener orden de compra:", error);
        setOrden(null);
      } finally {
        setLoading(false);
      }
    };

    if (idOC) fetchOrden();
  }, [idOC]);

  if (loading) return <div className="p-4">Cargando orden de compra...</div>;
  if (!orden) return <div className="p-4">Orden de compra no encontrada.</div>;

  return <OCviewContainer orden={orden} />;
}
