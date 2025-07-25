export default function normalizePaymentPayload({
  items,
  facturasSeleccionadas,
  idProveedor,
  observaciones,
  archivos,
  idEmpresa = 1,
}) {
  // 1) Fecha base
  const fechaBase =
    items[0]?.fecha_acreditacion || items[0]?.fecha || new Date();
  const fechaISO = new Date(fechaBase).toISOString().slice(0, 10);

  // 2) Header de la OP
  const totalMonto = items.reduce(
    (acc, it) => acc + (Number(it.monto_aplicado) || 0),
    0
  );
  const header = {
    id_proveedor: idProveedor,
    id_factura: facturasSeleccionadas[0]?.id_factura || null,
    numero_comprobante: "",
    fecha: fechaISO,
    fecha_pago: fechaISO,
    fecha_ejecucion: fechaISO,
    medio: "",
    banco: "",
    monto: totalMonto,
    estado_pago: "ejecutada",
    estado_factura: facturasSeleccionadas.length === 1 ? "total" : "parcial",
    observaciones,
    sync_origen: "manual",
    estado_logico: 1,
    id_empresa: idEmpresa,
    tipo_id_empresa: "manual",
    tipo_documento: "orden_pago",
  };

  // 3) Agrupar items reales por factura
  const mapItems = items.reduce((m, it) => {
    (m[it.id_factura] = m[it.id_factura] || []).push(it);
    return m;
  }, {});

  // 4) Generar items, pero sólo con monto_aplicado > 0
  const pagosItems = facturasSeleccionadas.flatMap((f) => {
    const reales = mapItems[f.id_factura] || [];
    if (reales.length) {
      return reales
        .map((it) => ({
          id_factura: it.id_factura,
          numero_comprobante: it.numero_comprobante,
          medio: it.medio,
          fecha_acreditacion:
            it.fecha instanceof Date
              ? it.fecha.toISOString().slice(0, 10)
              : it.fecha,
          observaciones: it.observaciones,
          monto_aplicado: Number(it.monto_aplicado) || 0,
          cheques: it.cheques || [],
        }))
        .filter((it) => it.monto_aplicado > 0);
    }
    // si no hay ítems reales no creamos sintéticos
    return [];
  });

  // 5) Payload de facturas
  const facturas = facturasSeleccionadas.map((f) => ({
    id_factura: f.id_factura,
    monto_pagado: Number(f.monto) || 0,
    estado_factura: f.estado_factura,
  }));

  return {
    ...header,
    adjuntos: archivos,
    items: pagosItems,
    facturas,
  };
}
