import { useState } from "react";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { NCeditHeader } from "./NCeditHeader";
import { NCeditItem } from "./NCeditItem";
import NCeditextras from "./NCeditextras";
import NCeditButtons from "./NCeditButtons";

const NCeditForm = ({ proveedor, notaCredito }) => {
  const { updateNotaCredito, normalizeNotaCreditoPayload } =
    useProveedorInvoices();
  const [comprobantes, setComprobantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => ({
    ...notaCredito,
    fecha_emision: notaCredito.fecha_emision?.split("T")[0] || "",
    fecha_vencimiento: notaCredito.fecha_vencimiento?.split("T")[0] || "",
    fecha_contable: notaCredito.fecha_contable?.split("T")[0] || "",
    fecha_acreditacion: notaCredito.fecha_acreditacion?.split("T")[0] || "",
    observaciones_nota: notaCredito.observaciones_nota || "",
  }));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setComprobantes(files);

    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        url_factura_comprobante: files[0].name,
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let urlComprobante = formData.url_factura_comprobante || "";

      if (comprobantes.length > 0) {
        const archivoFormData = new FormData();
        archivoFormData.append("file", comprobantes[0]);
        archivoFormData.append("folder", "notas-credito");

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/uploads`, {
          method: "POST",
          body: archivoFormData,
        });

        if (res.ok) {
          const data = await res.json();
          urlComprobante = data.url;
        } else {
          toast.error("Error al subir el archivo de comprobante");
          setIsSubmitting(false);
          return;
        }
      }

      const finalItems = [
        {
          id_articulo: null,
          nombre_manual: "Ítem único - generado por monto total",
          cantidad: 1,
          precio_unitario: formData.monto_total || 0,
          valor_descuento: 0,
          subtotal_manual: formData.monto_total || 0,
        },
      ];

      const payload = normalizeNotaCreditoPayload(
        {
          ...formData,
          url_factura_comprobante: urlComprobante,
        },
        finalItems
      );

      await updateNotaCredito(formData.id_factura, payload);

      toast.success("Nota de Crédito modificada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (error) {
      console.error("Error al actualizar nota de crédito:", error);
      toast.error("Hubo un error al actualizar la nota de crédito");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mx-8 pb-10">
      <NCeditHeader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre || ""}
        proveedorCuit={proveedor.cuit || ""}
        proveedorRazonSocial={proveedor.razon_social || ""}
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
        isSubmitting={isSubmitting}
        onUpdate={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
};

export default NCeditForm;
