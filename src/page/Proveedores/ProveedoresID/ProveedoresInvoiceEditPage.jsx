import InvoiceEditContainer from "@/components/proveedores/proveedor/invoicePage/invoiceEditPage/InvoiceEditContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/contexts/ProveedorContext";

export default function ProveedoresInvoiceEditPage() {
  const { idFactura } = useParams();

  const [factura, setFactura] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const { proveedores } = useProveedores();

  // 1. Siempre fetch a la factura por id (trae items)
  useEffect(() => {
    if (!idFactura) return;

    const fetchFactura = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/proveedores/facturas/${idFactura}`
        );
        if (!res.ok) throw new Error("Factura no encontrada");
        const data = await res.json();
        data.fecha_emision = data.fecha_emision?.split("T")[0] ?? "";
        data.fecha_vencimiento = data.fecha_vencimiento?.split("T")[0] ?? "";
        data.fecha_contable = data.fecha_contable?.split("T")[0] ?? "";
        setFactura(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFactura();
  }, [idFactura, API_URL]);

  // 2. Trae proveedor (del contexto si está, sino fetch)
  useEffect(() => {
    if (!factura?.id_proveedor) return;

    const fetchProveedor = async () => {
      try {
        // Busca en el contexto
        const proveedorContext = proveedores?.find(
          (p) => String(p.id_proveedor) === String(factura.id_proveedor)
        );
        if (proveedorContext) {
          setProveedor(proveedorContext);
        } else {
          // Si no está, fetch por id
          const res = await fetch(
            `${API_URL}/api/proveedores/${factura.id_proveedor}`
          );
          if (!res.ok) throw new Error("Proveedor no encontrado");
          const data = await res.json();
          setProveedor(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProveedor();
  }, [factura?.id_proveedor, proveedores, API_URL]);

  if (error) return <div>Error: {error}</div>;
  if (!factura) return <div>Cargando factura...</div>;
  if (!proveedor) return <div>Cargando proveedor...</div>;

  return <InvoiceEditContainer factura={factura} proveedor={proveedor} />;
}
