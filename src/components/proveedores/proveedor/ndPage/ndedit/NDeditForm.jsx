import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";
import { NDeditHeader } from "./NDeditHeader";
import { NDeditItem } from "./NDeditItem";
import NDeditextras from "./NDeditextras";
import NDeditButtons from "./NDeditButtons";
import { Separator } from "@radix-ui/react-dropdown-menu";

const NDeditForm = ({ proveedor, notaDebito }) => {
  const { updateNotaDebito, normalizeNotaDebitoPayload } =
    useProveedorInvoices();
  const [comprobantes, setComprobantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Estado inicial con datos de la ND para editar
  const [formData, setFormData] = useState(() => ({
    ...notaDebito,
    fecha_emision: notaDebito.fecha_emision?.split("T")[0] || "",
    fecha_vencimiento: notaDebito.fecha_vencimiento?.split("T")[0] || "",
    fecha_contable: notaDebito.fecha_contable?.split("T")[0] || "",
    fecha_acreditacion: notaDebito.fecha_acreditacion?.split("T")[0] || "",
    observaciones_nota: notaDebito.observaciones_nota || "",
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
        archivoFormData.append("folder", "notas-debito");

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

      const payload = normalizeNotaDebitoPayload(
        {
          ...formData,
          url_factura_comprobante: urlComprobante,
        },
        finalItems
      );

      await updateNotaDebito(formData.id_factura, payload);

      toast.success("Nota de Débito modificada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (error) {
      console.error("Error al actualizar nota de débito:", error);
      toast.error("Hubo un error al actualizar la nota de débito");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mx-8 pb-10">
      <NDeditHeader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre || ""}
        proveedorCuit={proveedor.cuit || ""}
        proveedorRazonSocial={proveedor.razon_social || ""}
      />
      <Separator className="mt-10 mb-8" />
      <NDeditItem formData={formData} setFormData={setFormData} />
      <Separator className="mt-10 mb-8" />
      <NDeditextras
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
      />
      <NDeditButtons
        isSubmitting={isSubmitting}
        onUpdate={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
};

export default NDeditForm;
