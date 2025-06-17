import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";

import { format } from "date-fns";

import ProveedorNCformHeader from "./ProveedorNCformHeader";
import ProveedorNCformItem from "./ProveedorNCformItem";
import ProveedorNCformExtras from "./ProveedorNCformExtras";
import ProveedorNCformButtons from "./ProveedorNCformButtons";
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

export default function ProveedorNCform({ proveedor }) {
  const { createNotaCredito, normalizeNotaCreditoPayload } =
    useProveedorInvoices();
  const [comprobantes, setComprobantes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_factura: 0,
    id_proveedor: proveedor.id_proveedor,
    tipo_comprobante: "nota de credito",
    numero_factura: "",
    fecha_emision: new Date().toISOString().split("T")[0],
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
      let urlComprobante = "";

      // 1. Subir el archivo si hay adjunto
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

      // SIEMPRE usar un solo ítem genérico
      const finalItems = [
        {
          id_articulo: null,
          nombre_manual: "Ítem único - generado por monto total",
          cantidad: 1,
          precio_unitario: formData.monto_total ?? 0,
          valor_descuento: 0,
          subtotal_manual: formData.monto_total ?? 0,
        },
      ];

      // 3. Preparar el payload con la URL del comprobante
      const payload = normalizeNotaCreditoPayload(
        {
          ...formData,
          url_factura_comprobante:
            urlComprobante || formData.url_factura_comprobante || "",
        },
        finalItems
      );

      // 4. Crear la nota de crédito
      await createNotaCredito(payload);

      toast.success("Nota de Crédito registrada correctamente");
      navigate(`/proveedores/${proveedor.id_proveedor}`);
    } catch (error) {
      console.error("Error al guardar nota de crédito:", error);
      toast.error("Hubo un error al guardar la nota de crédito");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 mx-8 pb-10">
      <ProveedorNCformHeader
        formData={formData}
        setFormData={setFormData}
        proveedorNombre={proveedor.nombre ?? ""}
        proveedorCuit={proveedor.cuit ?? ""}
        proveedorRazonSocial={proveedor.razon_social ?? ""}
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
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        idProveedor={proveedor.id_proveedor}
      />
    </div>
  );
}
