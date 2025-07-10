import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { NDeditHeader } from "./NDeditHeader";
import { NDeditItem } from "./NDeditItem";
import NDeditextras from "./NDeditextras";
import NDeditButtons from "./NDeditButtons";
import { useUpdateFactura } from "@/queries/proveedores/factura/useUpdateFactura";

const API_URL = import.meta.env.VITE_API_URL;

export default function NDeditForm({ proveedor, notaDebito }) {
  const navigate = useNavigate();
  const updateM = useUpdateFactura();
  const [comprobantes, setComprobantes] = useState([]);
  const [formData, setFormData] = useState({
    ...notaDebito,
    fecha_emision: notaDebito.fecha_emision?.split("T")[0] || "",
    fecha_vencimiento: notaDebito.fecha_vencimiento?.split("T")[0] || "",
    fecha_contable: notaDebito.fecha_contable?.split("T")[0] || "",
    fecha_acreditacion: notaDebito.fecha_acreditacion?.split("T")[0] || "",
    observaciones_nota: notaDebito.observaciones_nota || "",
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
      let url = formData.url_factura_comprobante || "";

      // Subida inline
      if (comprobantes[0]) {
        const fd = new FormData();
        fd.append("file", comprobantes[0]);
        fd.append("folder", "notas-debito");
        const res = await fetch(`${API_URL}/api/uploads`, {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          toast.error("Error al subir comprobante");
          return;
        }
        const { url: uploaded } = await res.json();
        url = uploaded;
      }

      // Ítem único
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

      // Normaliza payload
      const payload = {
        ...formData,
        url_factura_comprobante: url,
        items,
      };

      // Mutate
      await updateM.mutateAsync({
        id: formData.id_factura,
        payload,
      });

      toast.success("Nota de Débito modificada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al actualizar la nota de débito");
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
        isSubmitting={updateM.isLoading}
        onUpdate={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
}
