import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import {
  normalizePaymentPayload,
  useProveedorOP,
} from "@/contexts/ProveedorOPContext";
import { useNavigate } from "react-router-dom";
import ProveedorOPExtras from "./ProveedorOPExtras";
import ProveedorOPButtons from "./ProveedorOPButtons";
import ProveedorOPpagos from "./ProveedorOPpagos";
import ProveedorOPinvoices from "./ProveedorOPinvoices";
import ProveedorOPheader from "./ProveedorOPheader";

export default function ProveedorOPform({ modo, proveedor }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { createMultipleSupplierPayments } = useProveedorOP();
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);

  //////////// Form ////////////////

  const [formData, setFormData] = useState({
    observaciones: "",
    comprobantes: [],
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, comprobantes: files }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resumen = {
    facturasSeleccionadas: facturasSeleccionadas.length,
    totalFacturas: facturasSeleccionadas.reduce(
      (acc, f) => acc + parseFloat(f.monto),
      0
    ),
    totalPagos: items.reduce(
      (acc, item) => acc + Number(item.monto_aplicado ?? item.monto ?? 0),
      0
    ),
  };

  /////// HandleSubmit ////////////

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalFacturas = facturasSeleccionadas.reduce(
      (acc, f) => acc + parseFloat(f.monto),
      0
    );
    const totalPagos = items.reduce(
      (acc, item) => acc + Number(item.monto_aplicado ?? item.monto ?? 0),
      0
    );

    if (Math.abs(totalFacturas - totalPagos) > 0.009) {
      toast.error(
        "La suma de pagos debe coincidir exactamente con el monto total a cancelar en las facturas seleccionadas."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Subir comprobantes si existen
      const uploadedFiles = await Promise.all(
        formData.comprobantes.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("folder", "comprobantes");

          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/uploads`,
            {
              method: "POST",
              body: data,
            }
          );

          if (!res.ok) {
            toast.error("Error al subir un comprobante");
            throw new Error("Error al subir comprobante");
          }

          const result = await res.json();
          return {
            url: result.url,
            nombre: result.original_filename + result.extension,
          };
        })
      );

      // 2. Normalizar payload para backend
      const payload = normalizePaymentPayload({
        items,
        facturas: facturasSeleccionadas.map((f) => ({
          id_factura: f.id_factura,
          monto_a_saldar: Number(f.monto),
        })),
        idProveedor,
        observaciones: formData.observaciones ?? "",
        archivos: uploadedFiles,
      });

      // 3. Enviar al backend
      await createMultipleSupplierPayments(payload);

      toast.success("Orden de pago guardada correctamente.");
      navigate(`/proveedores/${idProveedor}`);
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error);
      toast.error("Error al guardar la orden de pago.");
    } finally {
      setIsSubmitting(false);
    }
  };

  //////////////// FORM /////////////////////////////////////////////////////

  return (
    <form className="space-y-6 mx-8 pb-10" onSubmit={handleSubmit}>
      <ProveedorOPheader proveedor={proveedor} />

      <Separator className="mt-10 mb-8" />

      <ProveedorOPinvoices
        proveedor={proveedor}
        facturasSeleccionadas={facturasSeleccionadas}
        setFacturasSeleccionadas={setFacturasSeleccionadas}
      />

      <Separator className="my-10" />

      <ProveedorOPpagos
        items={items}
        setItems={setItems}
        idProveedorCliker={proveedor.id_proveedor_cliker}
      />
      <Separator className="my-10" />

      <ProveedorOPExtras
        formData={formData}
        inputStyle="input-clase"
        handleFileChange={handleFileChange}
        handleChange={handleChange}
        resumen={resumen}
      />

      <ProveedorOPButtons
        idProveedor={proveedor.id_proveedor}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
