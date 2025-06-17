import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NDeditContainer from "@/components/proveedores/proveedor/ndPage/ndedit/NDeditContainer";
import { useProveedores } from "@/contexts/ProveedorContext";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedoresNDeditPage() {
  const { id, idND } = useParams(); // idProveedor y id de la ND
  const { proveedores } = useProveedores();
  const { getInvoicesForProveedor, refreshProveedorInvoices } =
    useProveedorInvoices();

  const [proveedor, setProveedor] = useState(null);
  const [notaDebito, setNotaDebito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const idProveedor = Number(id);
    if (!idProveedor || !idND) {
      setError("Parámetros inválidos");
      setLoading(false);
      return;
    }

    // 1. Buscar proveedor en contexto
    const proveedorFound = proveedores?.find(
      (p) => String(p.id_proveedor) === String(idProveedor)
    );

    // 2. Buscar ND en contexto de facturas
    const invoices = getInvoicesForProveedor(idProveedor);
    const notaDebitoFound = invoices?.find(
      (f) =>
        (String(f.id_factura) === String(idND) ||
          String(f.id) === String(idND)) && // por si el campo es 'id' o 'id_factura'
        (f.tipo_comprobante === "nota de debito" ||
          f.tipo_comprobante === "nota_de_debito" || // por si hay diferencias de naming
          f.tipo_comprobante === "ND")
    );

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        let proveedorData = proveedorFound;
        if (!proveedorData) {
          const resProveedor = await fetch(
            `${API_URL}/api/proveedores/${idProveedor}`
          );
          if (!resProveedor.ok) throw new Error("Proveedor no encontrado");
          proveedorData = await resProveedor.json();
        }

        let notaDebitoData = notaDebitoFound;
        if (!notaDebitoData) {
          // Refrescá por si hay ND nuevas no traídas
          await refreshProveedorInvoices(idProveedor, true);
          const refreshedInvoices = getInvoicesForProveedor(idProveedor);
          notaDebitoData = refreshedInvoices?.find(
            (f) =>
              (String(f.id_factura) === String(idND) ||
                String(f.id) === String(idND)) &&
              (f.tipo_comprobante === "nota de debito" ||
                f.tipo_comprobante === "nota_de_debito" ||
                f.tipo_comprobante === "ND")
          );
          if (!notaDebitoData) {
            // Si aún así no está, fetch directo (edge case, muy raro)
            const resND = await fetch(
              `${API_URL}/api/proveedores/facturas/${idND}`
            );
            if (!resND.ok) throw new Error("Nota de Débito no encontrada");
            notaDebitoData = await resND.json();
          }
        }

        // Formatear fechas para input date
        [
          "fecha_emision",
          "fecha_vencimiento",
          "fecha_contable",
          "fecha_acreditacion",
        ].forEach((campo) => {
          if (notaDebitoData[campo])
            notaDebitoData[campo] = notaDebitoData[campo].split("T")[0];
        });

        setProveedor(proveedorData);
        setNotaDebito(notaDebitoData);
      } catch (e) {
        setError(e.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [
    id,
    idND,
    proveedores,
    getInvoicesForProveedor,
    refreshProveedorInvoices,
  ]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!proveedor || !notaDebito) return <div>Datos no encontrados</div>;

  return <NDeditContainer proveedor={proveedor} notaDebito={notaDebito} />;
}
