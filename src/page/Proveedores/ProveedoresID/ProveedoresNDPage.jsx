import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProveedorNDcontainer from "@/components/proveedores/proveedor/ndPage/ProveedorNDcontainer";

export default function ProveedoresNDPage() {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!id) {
      setError("ID de proveedor no válido");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/api/proveedores/${id}`, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("Proveedor no encontrado");
        return res.json();
      })
      .then((data) => setProveedor(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, API_URL]);

  if (loading) return <p>Cargando proveedor...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!proveedor) return <p>Error: proveedor no encontrado</p>;

  return <ProveedorNDcontainer proveedor={proveedor} />;
}
