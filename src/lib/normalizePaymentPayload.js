export default function normalizePaymentPayload({
  items,
  facturas,
  idProveedor,
  observaciones,
  archivos,
  idEmpresa = 1,
}) {
  // 1) Fecha base
  const fechaBase =
    items[0]?.fecha_acreditacion || items[0]?.fecha || new Date();
  const fechaISO = new Date(fechaBase).toISOString().slice(0, 10);

  // 2) Suma total de subpagos
  const totalMonto = items.reduce(
    (acc, item) => acc + (Number(item.monto_aplicado) || 0),
    0
  );

  // 3) Header para proveedor_pago
  const header = {
    id_proveedor: idProveedor,
    id_factura: facturas[0]?.id_factura || null,
    numero_comprobante: "",
    fecha: fechaISO,
    fecha_pago: fechaISO,
    fecha_ejecucion: fechaISO,
    medio: "",
    banco: "",
    monto: totalMonto,
    estado_pago: "ejecutada",
    estado_factura: facturas.length === 1 ? "total" : "parcial",
    observaciones,
    sync_origen: "manual",
    estado_logico: 1,
    id_empresa: idEmpresa,
    tipo_id_empresa: "manual",
    tipo_documento: "orden_pago",
  };

  // 4) Items para proveedor_pago_item
  const pagosItems = items.map((it) => ({
    id_factura: it.id_factura,
    numero_comprobante: it.numero_comprobante,
    medio: it.medio,
    fecha_acreditacion:
      it.fecha instanceof Date ? it.fecha.toISOString().slice(0, 10) : it.fecha,
    observaciones: it.observaciones,
    monto_aplicado: Number(it.monto_aplicado) || 0,
  }));

  // 5) Facturas a cancelar (si las usás para lógica extra)
  const facturasNorm = facturas.map((f) => ({
    id_factura: f.id_factura,
    monto_a_saldar: Number(f.monto_a_saldar) || 0,
  }));

  return {
    ...header,
    adjuntos: archivos, // proveedor_pago_archivo
    items: pagosItems, // proveedor_pago_item
    facturas: facturasNorm,
  };
}
