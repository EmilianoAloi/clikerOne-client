const VALID_TYPES = [
  "factura a",
  "factura b",
  "factura c",
  "factura",
  "nota de credito",
  "nota de debito",
];

export const calcTotal = (items, iibb = 0) => {
  const subtotal = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio_unitario) || 0;
    const descuento = Number(item.valor_descuento) || 0;
    const neto =
      cantidad * precio * (1 - (descuento > 0 ? descuento : 0) / 100);
    return acc + neto;
  }, 0);
  const iva = items.reduce((acc, item) => {
    const cantidad = Number(item.cantidad) || 0;
    const precio = Number(item.precio_unitario) || 0;
    const descuento = Number(item.valor_descuento) || 0;
    const iva = Number(item.iva) || 0;
    const neto =
      cantidad * precio * (1 - (descuento > 0 ? descuento : 0) / 100);
    return acc + (neto * iva) / 100;
  }, 0);
  const iibb_valor = subtotal * (Number(iibb) / 100);
  return subtotal + iva + iibb_valor;
};

export const mapFormToApi = (form, proveedor) => {
  const normalizeDate = (v) => (!v || String(v).trim() === "" ? null : v);

  const items = form.items || [];
  const total = Number(form.total) || calcTotal(items, form.iibb_porcentaje);

  return {
    id_proveedor: proveedor.id_proveedor,
    numero_factura: form.numero_factura,
    fecha_emision: normalizeDate(form.fecha_emision),
    fecha_acreditacion: normalizeDate(form.fecha_acreditacion),
    fecha_vencimiento: normalizeDate(form.fecha_vencimiento),
    fecha_contable: normalizeDate(form.fecha_contable),
    condicion_venta: form.condicion_venta || "",
    tipo_comprobante: VALID_TYPES.includes(form.tipo_comprobante)
      ? form.tipo_comprobante
      : "factura",
    monto_total: total,
    estado_saldo: "pendiente de pago",
    observaciones: form.observaciones || "",
    observaciones_nota: "",
    url_factura_comprobante: form.url_factura_comprobante ?? null,
    estado_logico: 1,
    sync_origen: "clikerOne",
    alicuota_iva: form.alicuota_iva?.toString() ?? null,
    percepcion_iibb: form.percepcion_iibb ?? null,
    items: items.map((item) => ({
      id_articulo: item.id_articulo > 0 ? item.id_articulo : null,
      nombre_manual: item.id_articulo > 0 ? null : item.nombre_manual || null,
      cantidad: Number(item.cantidad) || 1,
      precio_unitario: Number(item.precio_unitario) || 0,
      valor_descuento: Number(item.valor_descuento) || 0,
      subtotal_manual: item.subtotal_manual ?? null,
      iva: Number(item.iva) || 0,
      color: item.color,
      unidad_de_medida: item.unidad_de_medida,
    })),
    impuestos: Array.isArray(form.impuestos)
      ? form.impuestos.map((imp) => ({
          tipo: imp.detalle || "",
          descripcion: imp.detalle || "",
          base_imponible: parseFloat(imp.base_imponible) || 0,
          alicuota: parseFloat(imp.alicuota) || 0,
          monto:
            ((parseFloat(imp.base_imponible) || 0) *
              (parseFloat(imp.alicuota) || 0)) /
            100,
        }))
      : [],
  };
};
