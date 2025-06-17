import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/contexts/ProveedorContext";
import { useProveedorCompras } from "@/contexts/ProveedorOCContext";
import OCcontainer from "@/components/proveedores/proveedor/ocPage/OCcontainer";

export default function ProveedorOCeditPage() {
  const { id, idOC } = useParams();
  const { proveedores } = useProveedores();
  const {
    getComprasForProveedor,
    refreshProveedorCompras,
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

    const buscarOCenContexto = () => {
      const compras = getComprasForProveedor(id);
      console.log("Compras del proveedor:", compras);
      console.log("Intentando buscar OC en contexto:", idOC);
      // Acepta ambos campos de id por compatibilidad
      return compras.find(
        (oc) => String(oc.id_compra ?? oc.id_orden_compra) === String(idOC)
      );
    };

    let encontrada = buscarOCenContexto();

    if (encontrada) {
      setOrdenCompra(encontrada);
      setError(null);
      setLoading(false);
      setFetchTried(true); // Corta el ciclo
      return;
    }

    const fetchOC = async () => {
      try {
        await refreshProveedorCompras(id, true);
        encontrada = buscarOCenContexto();
        if (encontrada) {
          setOrdenCompra(encontrada);
          setError(null);
          setLoading(false);
          setFetchTried(true);
        } else {
          const oc = await getCompraById(Number(idOC));
          console.log("Resultado getCompraById:", oc);
          if (oc) {
            setOrdenCompra(oc);
            setError(null);
            setLoading(false);
            setFetchTried(true);
          } else {
            setError("Orden de compra no encontrada");
            setLoading(false);
            setFetchTried(true);
          }
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setFetchTried(true);
      }
    };

    fetchOC();
    // eslint-disable-next-line
  }, [
    id,
    idOC,
    getComprasForProveedor,
    refreshProveedorCompras,
    getCompraById,
    fetchTried,
  ]);

  // Render final:
  if (loading || loadingCompras) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (!proveedor || !ordenCompra) return <div>No encontrado.</div>;

  return (
    <OCcontainer proveedor={proveedor} modo="editar" compra={ordenCompra} />
  );
}
