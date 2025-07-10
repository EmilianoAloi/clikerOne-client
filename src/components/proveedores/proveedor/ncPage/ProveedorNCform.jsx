// src/components/proveedores/proveedor/ncPage/ProveedorNCform.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

import ProveedorNCformHeader from "./ProveedorNCformHeader";
import ProveedorNCformItem from "./ProveedorNCformItem";
import ProveedorNCformExtras from "./ProveedorNCformExtras";
import ProveedorNCformButtons from "./ProveedorNCformButtons";
import { useCreateFactura } from "@/queries/proveedores/factura/useCreateFactura";

export default function ProveedorNCform({ proveedor }) {
  const navigate = useNavigate();
  const createFactura = useCreateFactura(proveedor.id_proveedor);
  const [comprobantes, setComprobantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id_factura: 0,
    id_proveedor: proveedor.id_proveedor,
    tipo_comprobante: "nota de crédito",
    numero_factura: "",
    fecha_emision: new Date().toISOString().slice(0, 10),
    fecha_contable: format(new Date(), "yyyy-MM-dd"),
    monto_total: 0,
    observaciones: "",
    observaciones_nota: "",
    url_factura_comprobante: "",
    estado_logico: 1,
    creado_por: 1,
    fecha_creado: new Date().toISOString(),
    sync_origen: "clikerOne",
    fecha_vencimiento: "",
    condicion_venta: "",
    alicuota_iva: "",
    percepcion_iibb: "",
    estado_saldo: "pendiente de pago",
    fecha_acreditacion: format(new Date(), "yyyy-MM-dd"),
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setComprobantes(files);
    if (files[0]) {
      setFormData((f) => ({
        ...f,
        url_factura_comprobante: files[0].name,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // 1. Subir archivo si existe
      let urlComprobante = "";
      if (comprobantes.length) {
        const fd = new FormData();
        fd.append("file", comprobantes[0]);
        fd.append("folder", "notas-credito");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/uploads`, {
          method: "POST",
          body: fd,
        });
        if (!res.ok) throw new Error("Error upload");
        urlComprobante = (await res.json()).url;
      }

      // 2. Crear ítem genérico
      const items = [
        {
          id_articulo: null,
          nombre_manual: "Ítem único - generado por monto total",
          cantidad: 1,
          precio_unitario: formData.monto_total,
          valor_descuento: 0,
          subtotal_manual: formData.monto_total,
        },
      ];

      // 3. Armar payload
      const payload = {
        ...formData,
        url_factura_comprobante:
          urlComprobante || formData.url_factura_comprobante,
        items,
      };

      // 4. Disparar mutación
      await createFactura.mutateAsync(payload);
      toast.success("Nota de Crédito registrada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al guardar la nota de crédito");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (createFactura.isLoading) {
    return <p>Enviando nota de crédito…</p>;
  }

  return (
    <div className="space-y-6 mx-8 pb-10">
      <ProveedorNCformHeader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre}
        proveedorCuit={proveedor.cuit}
        proveedorRazonSocial={proveedor.razon_social}
      />

      <Separator className="mt-10 mb-8" />

      <ProveedorNCformItem formData={formData} setFormData={setFormData} />

      <Separator className="mt-10 mb-8" />

      <ProveedorNCformExtras
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
      />

      <ProveedorNCformButtons
        isSubmitting={isSubmitting || createFactura.isLoading}
        onSubmit={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
}
