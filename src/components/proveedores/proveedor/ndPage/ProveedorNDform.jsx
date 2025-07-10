// src/components/proveedores/proveedor/ndPage/ProveedorNDform.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import ProveedorNDheader from "./ProveedorNDheader";
import ProveedorNDItem from "./ProveedorNDItem";
import ProveedorNDExtras from "./ProveedorNDExtras";
import ProveedorNDbuttons from "./ProveedorNDbuttons";
import { useCreateFactura } from "@/queries/proveedores/factura/useCreateFactura";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProveedorNDform({ proveedor }) {
  const navigate = useNavigate();
  const createM = useCreateFactura();

  const [comprobantes, setComprobantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id_factura: 0,
    id_proveedor: proveedor.id_proveedor,
    tipo_comprobante: "nota de debito",
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
      setFormData((f) => ({ ...f, url_factura_comprobante: files[0].name }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let url = formData.url_factura_comprobante;

      // 1) Subir comprobante inline
      if (comprobantes[0]) {
        const fd = new FormData();
        fd.append("file", comprobantes[0]);
        fd.append("folder", "notas-debito");

        const uploadRes = await fetch(`${API_URL}/api/uploads`, {
          method: "POST",
          body: fd,
        });
        if (!uploadRes.ok) {
          toast.error("Error al subir comprobante");
          return;
        }
        const { url: uploadedUrl } = await uploadRes.json();
        url = uploadedUrl;
      }

      // 2) Ítem único
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

      // 3) Payload final
      const payload = {
        ...formData,
        url_factura_comprobante: url,
        items,
      };

      // 4) Crear nota de débito
      await createM.mutateAsync(payload);
      toast.success("Nota de Débito registrada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al guardar la nota de débito");
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = isSubmitting || createM.isLoading;

  return (
    <div className="space-y-6 mx-8 pb-10">
      <ProveedorNDheader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre}
        proveedorCuit={proveedor.cuit}
        proveedorRazonSocial={proveedor.razon_social}
      />
      <ProveedorNDItem formData={formData} setFormData={setFormData} />
      <ProveedorNDExtras
        formData={formData}
        setFormData={setFormData}
        handleFileChange={handleFileChange}
      />
      <ProveedorNDbuttons
        isSubmitting={loading}
        onSubmit={handleSubmit}
        idProveedor={proveedor.id_proveedor} // <- aquí
      />
    </div>
  );
}
