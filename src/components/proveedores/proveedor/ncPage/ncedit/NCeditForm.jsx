// src/components/proveedores/proveedor/ncPage/NCeditForm.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

import { NCeditHeader } from "./NCeditHeader";
import { NCeditItem } from "./NCeditItem";
import NCeditextras from "./NCeditextras";
import NCeditButtons from "./NCeditButtons";
import { useUpdateFactura } from "@/queries/proveedores/factura/useUpdateFactura";

export default function NCeditForm({ proveedor, notaCredito }) {
  const navigate = useNavigate();
  const updateFactura = useUpdateFactura(proveedor.id_proveedor);

  const [comprobantes, setComprobantes] = useState([]);
  const [formData, setFormData] = useState({
    ...notaCredito,
    fecha_emision: notaCredito.fecha_emision?.split("T")[0] || "",
    fecha_vencimiento: notaCredito.fecha_vencimiento?.split("T")[0] || "",
    fecha_contable: notaCredito.fecha_contable?.split("T")[0] || "",
    fecha_acreditacion: notaCredito.fecha_acreditacion?.split("T")[0] || "",
    observaciones_nota: notaCredito.observaciones_nota || "",
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
      let urlComprobante = formData.url_factura_comprobante || "";

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

      const items = [
        {
          id_articulo: null,
          nombre_manual: "Ítem único - generado por monto total",
          cantidad: 1,
          precio_unitario: formData.monto_total || 0,
          valor_descuento: 0,
          subtotal_manual: formData.monto_total || 0,
        },
      ];

      const payload = {
        ...formData,
        url_factura_comprobante: urlComprobante,
        items,
      };

      await updateFactura.mutateAsync({
        idFactura: formData.id_factura,
        body: payload,
      });

      toast.success("Nota de Crédito modificada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al actualizar la nota de crédito");
    }
  };

  if (updateFactura.isLoading) {
    return <p>Actualizando nota de crédito…</p>;
  }

  return (
    <div className="space-y-6 mx-8 pb-10">
      <NCeditHeader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre}
        proveedorCuit={proveedor.cuit}
        proveedorRazonSocial={proveedor.razon_social}
      />

      <Separator className="mt-10 mb-8" />

      <NCeditItem formData={formData} setFormData={setFormData} />

      <Separator className="mt-10 mb-8" />

      <NCeditextras
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
      />

      <NCeditButtons
        isSubmitting={updateFactura.isLoading}
        onUpdate={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
}
