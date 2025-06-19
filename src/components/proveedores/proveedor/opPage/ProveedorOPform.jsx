import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
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
import { useProveedorInvoices } from "@/contexts/ProveedorInvoicesContext";

export default function ProveedorOPform({ modo, proveedor, pagoData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { createMultipleSupplierPayments } = useProveedorOP();
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);
  const { refreshProveedorInvoices } = useProveedorInvoices();

  // EDIT: Fetch de facturas cuando se monta el form y cambia el proveedor
  useEffect(() => {
    if (proveedor?.id_proveedor) {
      refreshProveedorInvoices(proveedor.id_proveedor);
    }
  }, [proveedor?.id_proveedor, refreshProveedorInvoices]);

  // EDIT: Prellenar datos
  useEffect(() => {
    if (modo === "editar" && pagoData) {
      setFormData((prev) => ({
        ...prev,
        observaciones: pagoData.observaciones ?? "",
        comprobantes: [], // Si querés mostrar links, manejalo aparte
      }));
      // El backend te da .facturas y .pagos (o .items)
      setItems(
        (pagoData.pagos || pagoData.items || []).map((item) => ({
          ...item,
          numero_comprobante: item.numero ?? item.numero_comprobante ?? "",
          observaciones: item.observaciones,
        }))
      );
      setFacturasSeleccionadas(
        (pagoData.facturas || []).map((f) => ({
          ...f,
          monto: f.monto_a_saldar ?? f.monto_total ?? "", // Esto para que aparezca en el input "A pagar"
        }))
      );
    }
  }, [modo, pagoData]);

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
  function montoSeguro(val) {
    const n = Number(val);
    return !isNaN(n) && isFinite(n) ? n : 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Normalizar items y facturas para evitar NaN
      const itemsNormalizados = items.map((item) => ({
        ...item,
        monto_aplicado: montoSeguro(item.monto_aplicado ?? item.monto),
      }));

      const facturasNormalizadas = facturasSeleccionadas.map((f) => ({
        id_factura: f.id_factura,
        monto_a_saldar: montoSeguro(f.monto),
      }));

      // Validación: todos los montos deben ser válidos
      const invalidMonto =
        itemsNormalizados.some((item) => isNaN(item.monto_aplicado)) ||
        facturasNormalizadas.some((f) => isNaN(f.monto_a_saldar));
      if (invalidMonto) {
        toast.error("Todos los montos deben ser números válidos.");
        setIsSubmitting(false);
        return;
      }

      const totalFacturas = facturasNormalizadas.reduce(
        (acc, f) => acc + f.monto_a_saldar,
        0
      );
      const totalPagos = itemsNormalizados.reduce(
        (acc, item) => acc + item.monto_aplicado,
        0
      );

      if (Math.abs(totalFacturas - totalPagos) > 0.009) {
        toast.error(
          "La suma de pagos debe coincidir exactamente con el monto total a cancelar en las facturas seleccionadas."
        );
        setIsSubmitting(false);
        return;
      }

      // 1. Subir comprobantes si existen
      const uploadedFiles = await Promise.all(
        (formData.comprobantes || []).map(async (file) => {
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
        items: itemsNormalizados,
        facturas: facturasNormalizadas,
        idProveedor: proveedor.id_proveedor,
        observaciones: formData.observaciones ?? "",
        archivos: uploadedFiles,
      });

      // 3. Enviar al backend y esperar confirmación
      const success = await createMultipleSupplierPayments(
        payload,

        (idProveedor) => refreshProveedorInvoices(idProveedor, true)
      );
      if (success) {
        toast.success("Orden de pago guardada correctamente.");
        navigate(`/proveedores/${proveedor.id_proveedor}`);
      } else {
        toast.error("No se pudo guardar la orden de pago.");
      }
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
        idProveedor={proveedor.id_proveedor}
        facturasSeleccionadas={facturasSeleccionadas}
        setFacturasSeleccionadas={setFacturasSeleccionadas}
        modo={modo}
      />

      <Separator className="my-10" />

      <ProveedorOPpagos
        items={items}
        setItems={setItems}
        idProveedorCliker={proveedor.id_proveedor_cliker}
        modo={modo}
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
