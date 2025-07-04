import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/utils/useProveedores";

import { useProveedorCompras } from "@/contexts/ProveedorOCContext";
import OCcontainer from "@/components/proveedores/proveedor/ocPage/OCcontainer";

export default function ProveedorOCeditPage() {
  const { id, idOC } = useParams();
  const { proveedores } = useProveedores();
  const {
    getComprasForProveedor,

    getCompraById,
    loading: loadingCompras,
  } = useProveedorCompras();

  const [ordenCompra, setOrdenCompra] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchTried, setFetchTried] = useState(false);

  // Buscar proveedor en contexto
  useEffect(() => {
    if (!id) return;
    const found = proveedores?.find(
      (p) => String(p.id_proveedor) === String(id)
    );
    setProveedor(found || null);
  }, [proveedores, id]);

  // Buscar OC en contexto, si no, forzar fetch, si no, fetch individual por ID
  useEffect(() => {
    if (!id || !idOC || fetchTried) return;

    setLoading(true);

    const compras = getComprasForProveedor(id) || [];
    let encontrada = compras.find(
      (oc) => String(oc.id_compra ?? oc.id_orden_compra) === String(idOC)
    );

    // Si la encontraste pero NO tiene items, es incompleta ⇒ Forzá fetch detalle
    if (
      encontrada &&
      Array.isArray(encontrada.items) &&
      encontrada.items.length > 0
    ) {
      setOrdenCompra(encontrada);
      setError(null);
      setLoading(false);
      setFetchTried(true);
      return;
    }

    // Siempre hace fetch de detalle si no la encontraste o no tiene items
    const fetchOC = async () => {
      try {
        const oc = await getCompraById(Number(idOC));
        if (oc) {
          setOrdenCompra(oc);
          setError(null);
        } else {
          setError("Orden de compra no encontrada");
        }
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
        setFetchTried(true);
      }
    };

    fetchOC();
  }, [id, idOC, getComprasForProveedor, getCompraById, fetchTried]);

  // Render final:
  if (loading || loadingCompras) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!proveedor || !ordenCompra) return <div>No encontrado.</div>;

  return (
    <OCcontainer proveedor={proveedor} modo="editar" compra={ordenCompra} />
  );
}
