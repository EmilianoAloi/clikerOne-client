import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NCeditContainer from "@/components/proveedores/proveedor/ncPage/ncedit/NCeditContainer";
import { useProveedores } from "@/contexts/ProveedorContext";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedoresNCeditPage() {
  const { id, idNC } = useParams(); // idProveedor y id de la NC
  const { proveedores } = useProveedores();
  const { getInvoicesForProveedor, refreshProveedorInvoices } =
    useProveedorInvoices();

  const [proveedor, setProveedor] = useState(null);
  const [notaCredito, setNotaCredito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const idProveedor = Number(id);
    if (!idProveedor || !idNC) {
      console.error("Parámetros inválidos:", { idProveedor, idNC });
      setError("Parámetros inválidos");
      setLoading(false);
      return;
    }

    // Buscar proveedor en contexto
    const proveedorFound = proveedores?.find(
      (p) => String(p.id_proveedor) === String(idProveedor)
    );
    console.log(
      "ProveedoresNCeditPage - proveedor encontrado en contexto:",
      proveedorFound
    );

    // Buscar nota crédito en contexto de facturas
    const invoices = getInvoicesForProveedor(idProveedor);
    console.log(
      `ProveedoresNCeditPage - facturas obtenidas del contexto para proveedor ${idProveedor}:`,
      invoices
    );

    const notaCreditoFound = invoices?.find(
      (f) =>
        (String(f.id_factura) === String(idNC) ||
          String(f.id) === String(idNC)) &&
        (f.tipo_comprobante === "nota de credito" ||
          f.tipo_comprobante === "nota_de_credito" ||
          f.tipo_comprobante === "NC")
    );
    console.log(
      "ProveedoresNCeditPage - nota de crédito encontrada en contexto:",
      notaCreditoFound
    );

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        let proveedorData = proveedorFound;
        if (!proveedorData) {
          console.log(
            "ProveedoresNCeditPage - proveedor no encontrado en contexto, haciendo fetch..."
          );
          const resProveedor = await fetch(
            `${API_URL}/api/proveedores/${idProveedor}`
          );
          if (!resProveedor.ok) throw new Error("Proveedor no encontrado");
          proveedorData = await resProveedor.json();
          console.log(
            "ProveedoresNCeditPage - proveedor obtenido por fetch:",
            proveedorData
          );
        }

        let notaCreditoData = notaCreditoFound;
        if (!notaCreditoData) {
          console.log(
            "ProveedoresNCeditPage - nota de crédito no encontrada en contexto, refrescando facturas..."
          );
          await refreshProveedorInvoices(idProveedor, true);
          const refreshedInvoices = getInvoicesForProveedor(idProveedor);
          console.log(
            "ProveedoresNCeditPage - facturas refrescadas:",
            refreshedInvoices
          );

          notaCreditoData = refreshedInvoices?.find(
            (f) =>
              (String(f.id_factura) === String(idNC) ||
                String(f.id) === String(idNC)) &&
              (f.tipo_comprobante === "nota de credito" ||
                f.tipo_comprobante === "nota_de_credito" ||
                f.tipo_comprobante === "NC")
          );
          console.log(
            "ProveedoresNCeditPage - nota de crédito encontrada tras refrescar:",
            notaCreditoData
          );

          if (!notaCreditoData) {
            console.log(
              "ProveedoresNCeditPage - nota de crédito no encontrada tras refresco, haciendo fetch individual..."
            );
            const resNC = await fetch(
              `${API_URL}/api/proveedores/facturas/${idNC}`
            );
            if (!resNC.ok) throw new Error("Nota de Crédito no encontrada");
            notaCreditoData = await resNC.json();
          }
        }

        // Formatear fechas para inputs tipo date
        [
          "fecha_emision",
          "fecha_vencimiento",
          "fecha_contable",
          "fecha_acreditacion",
        ].forEach((campo) => {
          if (notaCreditoData[campo])
            notaCreditoData[campo] = notaCreditoData[campo].split("T")[0];
        });

        setProveedor(proveedorData);
        setNotaCredito(notaCreditoData);
      } catch (e) {
        console.error("ProveedoresNCeditPage - Error en fetchData:", e);
        setError(e.message || "Error inesperado");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    id,
    idNC,
    proveedores,
    getInvoicesForProveedor,
    refreshProveedorInvoices,
  ]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!proveedor || !notaCredito) return <div>Datos no encontrados</div>;

  return <NCeditContainer proveedor={proveedor} notaCredito={notaCredito} />;
}
