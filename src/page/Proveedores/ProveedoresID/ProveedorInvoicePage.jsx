import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/contexts/ProveedorContext";
import ProveedorInvoiceContainer from "@/components/proveedores/proveedor/invoicePage/ProveedorInvoiceContainer";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedorInvoicePage() {
  const { id } = useParams();
  const { proveedores } = useProveedores();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Buscar en el contexto primero
    const found = proveedores?.find(
      (p) => String(p.id_proveedor) === String(id)
    );
    if (found) {
      setProveedor(found);
      setLoading(false);
      return;
    }

    // Si no está, buscarlo por fetch
    const fetchProveedor = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/proveedores/${id}`);
        if (!res.ok) throw new Error("Proveedor no encontrado");
        const data = await res.json();
        setProveedor(data);
      } catch (err) {
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

  return <ProveedorInvoiceContainer proveedor={proveedor} />;
}
