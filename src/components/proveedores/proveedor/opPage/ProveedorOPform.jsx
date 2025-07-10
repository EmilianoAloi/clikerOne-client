import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ProveedorOPExtras from "./ProveedorOPExtras";
import ProveedorOPButtons from "./ProveedorOPButtons";
import ProveedorOPpagos from "./ProveedorOPpagos";
import ProveedorOPinvoices from "./ProveedorOPinvoices";
import ProveedorOPheader from "./ProveedorOPheader";
import { useCrearOP } from "@/queries/proveedores/pagos/useCrearOP";
import { useFacturasByProveedor } from "@/queries/proveedores/factura/useFacturasByProveedor";
import normalizePaymentPayload from "@/lib/normalizePaymentPayload";

export default function ProveedorOPform({ modo, proveedor, pagoData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState([]);
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);
  const navigate = useNavigate();
  const crearOPMutation = useCrearOP();
  const { data: facturas = [], isLoading: loadingFacturas } =
    useFacturasByProveedor(proveedor?.id_proveedor);

  // Prellenar datos al editar
  useEffect(() => {
    if (modo === "editar" && pagoData) {
      setFormData((prev) => ({
        ...prev,
        observaciones: pagoData.observaciones ?? "",
        comprobantes: [],
      }));
      setItems(
        (pagoData.pagos || pagoData.items || []).map((item) => ({
          ...item,
          numero_comprobante: item.numero ?? item.numero_comprobante ?? "",
          observaciones: item.observaciones,
          medio: item.medio ?? "",
          fecha: item.fecha ?? new Date().toISOString().slice(0, 10),
          monto_aplicado: item.monto_aplicado ?? item.monto,
        }))
      );
      setFacturasSeleccionadas(
        (pagoData.facturas || []).map((f) => ({
          ...f,
          monto: f.monto_a_saldar ?? f.monto_total ?? "",
        }))
      );
    }
  }, [modo, pagoData]);

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

  function montoSeguro(val) {
    const n = Number(val);
    return !isNaN(n) && isFinite(n) ? n : 0;
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1) Normalizar montos en items y facturas
      const itemsNorm = items.map((it) => ({
        ...it,
        monto_aplicado: montoSeguro(it.monto_aplicado ?? it.monto),
      }));
      const facturasNorm = facturasSeleccionadas.map((f) => ({
        id_factura: f.id_factura,
        monto_a_saldar: montoSeguro(f.monto),
      }));

      // Validar números
      const invalid =
        itemsNorm.some((it) => isNaN(it.monto_aplicado)) ||
        facturasNorm.some((f) => isNaN(f.monto_a_saldar));
      if (invalid) {
        toast.error("Todos los montos deben ser válidos.");
        setIsSubmitting(false);
        return;
      }

      // 2) Subir archivos
      const uploaded = await Promise.all(
        (formData.comprobantes || []).map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("folder", "comprobantes");
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/uploads`,
            { method: "POST", body: fd }
          );
          if (!res.ok) {
            toast.error("Error subiendo comprobante");
            throw new Error("Upload error");
          }
          const json = await res.json();
          return {
            url: json.url,
            nombre: json.original_filename + json.extension,
          };
        })
      );

      // 3) Construir items con id_factura (mismo índice)
      const paymentItems = itemsNorm.map((it, i) => ({
        ...it,
        id_factura: facturasNorm[i]?.id_factura,
      }));

      // 4) Payload para el backend
      const base = normalizePaymentPayload({
        items: paymentItems,
        facturas: facturasNorm,
        idProveedor: proveedor.id_proveedor,
        observaciones: formData.observaciones,
        archivos: uploaded,
      });

      console.log("Payload CORREGIDO:", base);

      // 5) Mutate
      const result = await crearOPMutation.mutateAsync(base);
      if (result?.error) {
        toast.error(result.error);
        setIsSubmitting(false);
        return;
      }

      toast.success(result.mensaje || "Orden de pago guardada.");
      navigate(`/proveedores/${proveedor.id_proveedor}`, {
        state: { refresh: true },
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error al guardar orden de pago.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-6 mx-8 pb-10" onSubmit={handleSubmit}>
      <ProveedorOPheader proveedor={proveedor} />
      <Separator className="mt-10 mb-8" />
      <ProveedorOPinvoices
        idProveedor={proveedor.id_proveedor}
        facturasSeleccionadas={facturasSeleccionadas}
        setFacturasSeleccionadas={setFacturasSeleccionadas}
        modo={modo}
        facturas={facturas}
        loadingFacturas={loadingFacturas}
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
