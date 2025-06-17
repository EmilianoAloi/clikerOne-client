import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OPviewContainer from "@/components/proveedores/proveedor/opPage/opview/OPviewContainer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores/pagos`;

export default function ProveedorOPViewPage() {
  const { idOP } = useParams();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idOP) return;

    const getOrdenCompra = async () => {
      try {
        const res = await fetch(`${API_URL}/${idOP}`);
        if (!res.ok) {
          setOrden(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setOrden(data);
      } catch (error) {
        console.error("Error al obtener orden de compra:", error);
        setOrden(null);
      } finally {
        setLoading(false);
      }
    };

    getOrdenCompra();
  }, [idOP]);

  if (loading) return <div>Cargando orden de compra...</div>;
  if (!orden) return <div>Orden de compra no encontrada</div>;

  return <OPviewContainer pago={orden} />;
}
