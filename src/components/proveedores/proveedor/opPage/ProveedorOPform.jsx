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
import { useActualizarOP } from "@/queries/proveedores/pagos/useActualizarOP";
import { useFacturasByProveedor } from "@/queries/proveedores/factura/useFacturasByProveedor";
import normalizePaymentPayload from "@/lib/normalizePaymentPayload";

export default function ProveedorOPform({ modo, proveedor, pagoData }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    observaciones: "",
    comprobantes: [],
  });
  const [items, setItems] = useState([]);
  const [facturasSeleccionadas, setFacturasSeleccionadas] = useState([]);
  const navigate = useNavigate();

  const crearOP = useCrearOP();
  const actualizarOP = useActualizarOP();
  const mutation = modo === "editar" ? actualizarOP : crearOP;

  const { data: facturas = [], isLoading: loadingFacturas } =
    useFacturasByProveedor(proveedor?.id_proveedor);

  // useEffect(() => {
  //   if (modo === "editar" && pagoData) {
  //     setFormData({
  //       observaciones: pagoData.observaciones || "",
  //       comprobantes: [],
  //     });

  //     setItems(
  //       pagoData.items.map((item) => {
  //         const raw = item.fecha_acreditacion || item.fecha;
  //         let fechaObj = new Date(raw);
  //         if (isNaN(fechaObj)) fechaObj = new Date();
  //         return {
  //           id: item.id,
  //           id_factura: item.id_factura,
  //           numero_comprobante: item.numero_comprobante || "",
  //           medio: item.medio || "",
  //           fecha: fechaObj,
  //           observaciones: item.observaciones || "",
  //           monto_aplicado: Number(item.monto_aplicado || item.monto || 0),
  //         };
  //       })
  //     );

  //     setFacturasSeleccionadas(
  //       pagoData.items.map((item) => ({
  //         id_factura: item.id_factura,
  //         monto: Number(item.monto_aplicado || item.monto || 0),
  //         numero_factura: item.ProveedorFactura?.numero_factura || "",
  //         fecha_emision:
  //           item.ProveedorFactura?.fecha_emision?.slice(0, 10) || "",
  //         fecha_vencimiento:
  //           item.ProveedorFactura?.fecha_vencimiento?.slice(0, 10) || "",
  //         estado_saldo: item.ProveedorFactura?.estado_saldo || "",
  //         tipo_comprobante: item.ProveedorFactura?.tipo_comprobante || "",
  //       }))
  //     );
  //   }
  // }, [modo, pagoData]);

  // useEffect(() => {
  //   if (modo === "editar" && pagoData) {
  //     // 1) Rellenamos el formData
  //     setFormData({
  //       observaciones: pagoData.observaciones || "",
  //       comprobantes: [],
  //     });

  //     // 2) Cargamos los sub-pagos igual que antes
  //     setItems(
  //       pagoData.items.map((it) => {
  //         const fechaRaw = it.fecha_acreditacion || it.fecha;
  //         const fechaObj = isNaN(new Date(fechaRaw))
  //           ? new Date()
  //           : new Date(fechaRaw);
  //         return {
  //           id: it.id,
  //           id_factura: it.id_factura,
  //           numero_comprobante: it.numero_comprobante || "",
  //           medio: it.medio || "",
  //           fecha: fechaObj,
  //           observaciones: it.observaciones || "",
  //           monto_aplicado: Number(it.monto_aplicado || 0),
  //           cheques: it.cheques || [],
  //         };
  //       })
  //     );

  //     // 3) Inicializamos facturasSeleccionadas usando el saldo restante
  //     //    que ya nos calcula fetchPagoById en ProveedorFactura.monto_a_saldar
  //     const facturasUnicas = Array.from(
  //       new Map(
  //         pagoData.items.map((it) => [
  //           it.id_factura,
  //           it.ProveedorFactura, // guardamos la última ProveedorFactura para ese id
  //         ])
  //       ).values()
  //     );

  //     setFacturasSeleccionadas(
  //       facturasUnicas.map((f) => ({
  //         id_factura: f.id_factura,
  //         // monto_a_saldar ya es 0 si está totalmente pagada
  //         monto: Number(f.monto_a_saldar ?? 0),
  //         numero_factura: f.numero_factura,
  //         fecha_emision: f.fecha_emision?.slice(0, 10) || "",
  //         fecha_vencimiento: f.fecha_vencimiento?.slice(0, 10) || "",
  //         estado_saldo: f.estado_saldo,
  //         tipo_comprobante: f.tipo_comprobante,
  //       }))
  //     );
  //   }
  // }, [modo, pagoData]);

  useEffect(() => {
    if (modo === "editar" && pagoData) {
      // 1) Rellenamos el formData
      setFormData({
        observaciones: pagoData.observaciones || "",
        comprobantes: [],
      });

      // 2) Cargamos los sub-pagos igual que antes
      setItems(
        pagoData.items.map((it) => {
          const fechaRaw = it.fecha_acreditacion || it.fecha;
          const fechaObj = isNaN(new Date(fechaRaw))
            ? new Date()
            : new Date(fechaRaw);
          return {
            id: it.id,
            id_factura: it.id_factura,
            numero_comprobante: it.numero_comprobante || "",
            medio: it.medio || "",
            fecha: fechaObj,
            observaciones: it.observaciones || "",
            monto_aplicado: Number(it.monto_aplicado || 0),
            cheques: it.cheques || [],
          };
        })
      );

      // 3) Acumulamos por factura el total aplicado en esta orden
      const facturasMap = {};
      pagoData.items.forEach((it) => {
        const key = it.id_factura;
        const aplicado = Number(it.monto_aplicado || 0);
        // Si aún no existe, inicializamos con datos de la factura
        if (!facturasMap[key]) {
          const f = it.ProveedorFactura || {};
          facturasMap[key] = {
            id_factura: key,
            monto: 0,
            numero_factura: f.numero_factura || "",
            fecha_emision: f.fecha_emision?.slice(0, 10) || "",
            fecha_vencimiento: f.fecha_vencimiento?.slice(0, 10) || "",
            estado_saldo: f.estado_saldo || "",
            tipo_comprobante: f.tipo_comprobante || "",
          };
        }
        // Sumamos el monto aplicado de cada ítem
        facturasMap[key].monto += aplicado;
      });

      // 4) Volcamos el resultado a state
      setFacturasSeleccionadas(Object.values(facturasMap));
    }
  }, [modo, pagoData]);

  const handleFileChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      comprobantes: Array.from(e.target.files || []),
    }));

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const montoSeguro = (val) => {
    const n = Number(val);
    return !isNaN(n) && isFinite(n) ? n : 0;
  };

  const totalFacturas = facturasSeleccionadas.reduce(
    (acc, f) => acc + montoSeguro(f.monto),
    0
  );
  const totalPagos = items.reduce(
    (acc, it) => acc + montoSeguro(it.monto_aplicado),
    0
  );
  const resumen = {
    facturasSeleccionadas: facturasSeleccionadas.length,
    totalFacturas,
    totalPagos,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1) Normalizar facturas con monto_pagado y estado_factura
      const facturasNorm = facturasSeleccionadas.map((f) => {
        const pago = montoSeguro(f.monto);
        const saldoPrevio = montoSeguro(f.monto_a_saldar);
        return {
          id_factura: f.id_factura,
          monto_pagado: pago,
          estado_factura: pago >= saldoPrevio ? "total" : "parcial",
        };
      });

      // 2) Normalizar items
      const itemsNorm = items.map((it) => ({
        ...it,
        id_factura: it.id_factura || facturasNorm[0].id_factura,
        numero_comprobante: it.numero_comprobante,
        medio: it.medio,
        fecha_acreditacion:
          it.fecha instanceof Date
            ? it.fecha.toISOString().slice(0, 10)
            : it.fecha,
        observaciones: it.observaciones,
        monto_aplicado: montoSeguro(it.monto_aplicado),
        cheques: it.cheques || [],
      }));

      // 3) Validar montos
      if (
        itemsNorm.some((it) => isNaN(it.monto_aplicado)) ||
        facturasNorm.some((f) => isNaN(f.monto_pagado))
      ) {
        toast.error("Todos los montos deben ser válidos.");
        setIsSubmitting(false);
        return;
      }

      // 4) Subir comprobantes
      const archivos = await Promise.all(
        formData.comprobantes.map(async (file) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("folder", "comprobantes");
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/uploads`,
            { method: "POST", body: fd }
          );
          if (!res.ok) throw new Error("Upload error");
          const json = await res.json();
          return {
            url: json.url,
            nombre: json.original_filename + json.extension,
          };
        })
      );

      // 5) Construir payload
      const payload = normalizePaymentPayload({
        items: itemsNorm,
        facturasSeleccionadas: facturasNorm,
        idProveedor: proveedor.id_proveedor,
        observaciones: formData.observaciones,
        archivos,
      });

      // 6) Ejecutar mutation
      if (modo === "editar") {
        await mutation.mutateAsync({ idPago: pagoData.id_pago, data: payload });
      } else {
        await mutation.mutateAsync(payload);
      }

      toast.success(
        modo === "editar"
          ? "Orden de pago actualizada."
          : "Orden de pago creada."
      );
      navigate(`/proveedores/${proveedor.id_proveedor}`, {
        state: { refresh: true },
      });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Validation error"
      );
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
