import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProveedorInvoiceViewContainer from "@/components/proveedores/proveedor/invoicePage/invoiceview/ProveedorInvoiceViewContainer";

const API_URL = `${import.meta.env.VITE_API_URL}/api/proveedores/facturas`;

export default function ProveedorInvoiceViewPage() {
  const { idProveedor, idFactura } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idFactura) return;

    const getFactura = async () => {
      try {
        const res = await fetch(`${API_URL}/${idFactura}`);
        if (!res.ok) {
          setFactura(null);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setFactura(data);
      } catch (error) {
        console.error("Error al obtener factura:", error);
        setFactura(null);
      } finally {
        setLoading(false);
      }
    };

    getFactura();
  }, [idFactura]);

  if (loading) return <div>Cargando factura...</div>;
  if (!factura) {
    // Si querés redirigir a 404, sino poné un mensaje
    // navigate("/404");
    return <div>Factura no encontrada</div>;
  }

  return <ProveedorInvoiceViewContainer factura={factura} />;
}
