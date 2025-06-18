import InvoiceEditContainer from "@/components/proveedores/proveedor/invoicePage/invoiceEditPage/InvoiceEditContainer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProveedores } from "@/contexts/ProveedorContext";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

export default function ProveedoresInvoiceEditPage() {
  const { id, idFactura } = useParams();

  const [factura, setFactura] = useState(null);
  const [proveedor, setProveedor] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const { proveedores } = useProveedores();
  const { invoicesByProveedor } = useProveedorInvoices();

  useEffect(() => {
    if (!id || !idFactura) return;

    const fetchFactura = async () => {
      try {
        const facturasProveedor = invoicesByProveedor[id] || [];
        let encontrada = facturasProveedor.find(
          (f) => String(f.id_factura) === String(idFactura)
        );

        if (encontrada) {
          encontrada = {
            ...encontrada,
            fecha_emision: encontrada.fecha_emision?.split("T")[0],
            fecha_vencimiento: encontrada.fecha_vencimiento?.split("T")[0],
          };
          setFactura(encontrada);
        } else {
          const res = await fetch(
            `${API_URL}/api/proveedores/facturas/${idFactura}`
          );
          if (!res.ok) throw new Error("Factura no encontrada");
          const data = await res.json();
          data.fecha_emision = data.fecha_emision?.split("T")[0];
          data.fecha_vencimiento = data.fecha_vencimiento?.split("T")[0];
          setFactura(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFactura();
  }, [id, idFactura, invoicesByProveedor, API_URL]);

  useEffect(() => {
    if (!factura?.id_proveedor) return;

    const fetchProveedor = async () => {
      try {
        const proveedorContext = proveedores?.find(
          (p) => String(p.id_proveedor) === String(factura.id_proveedor)
        );
        if (proveedorContext) {
          setProveedor(proveedorContext);
        } else {
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
