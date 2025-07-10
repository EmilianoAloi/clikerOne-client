import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NCviewContainer from "@/components/proveedores/proveedor/ncPage/ncview/NCviewContainer";

export default function ProveedorNCviewPage() {
  const { id, idNC } = useParams();
  const [notaCredito, setNotaCredito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!idNC) return;

    setLoading(true);
    setError(false);

    fetch(
      `https://clikerone-server.up.railway.app/api/proveedores/facturas/${idNC}`,
      { cache: "no-store" }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Nota de Crédito no encontrada");
        return res.json();
      })
      .then((data) => {
        setNotaCredito(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [idNC]);

  if (loading) return <div>Cargando nota de crédito...</div>;
  if (error || !notaCredito) return <div>Nota de Crédito no encontrada.</div>;

  return <NCviewContainer proveedorId={Number(id)} notaCredito={notaCredito} />;
}
