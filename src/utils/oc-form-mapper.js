// De Backend (SupplierCompra) a Form (OCFormData)
export function toFormData(compra) {
  return {
    id_proveedor: Number(compra.id_proveedor),
    fecha_emision: compra.fecha_emision
      ? new Date(compra.fecha_emision)
      : new Date(),
    fecha_entrega: compra.fecha_entrega
      ? new Date(compra.fecha_entrega)
      : new Date(),
    fecha_contable: compra.fecha_contable
      ? new Date(compra.fecha_contable)
      : new Date(),
    fecha_vencimiento: compra.fecha_vencimiento
      ? new Date(compra.fecha_vencimiento)
      : undefined,
    condicion_pago: compra.condicion_pago || "",
    lugar_entrega: compra.lugar_entrega || "",
    monto_total: Number(compra.monto_total) || 0,
    estado_compra: compra.estado_compra || "pendiente",
    observaciones: compra.observaciones ?? "",
    url_orden_compra_comprobante: compra.url_orden_compra_comprobante ?? "",
    estado_logico:
      compra.estado_logico === true || compra.estado_logico === 1 ? 1 : 0,
    items:
      Array.isArray(compra.items) && compra.items.length > 0
        ? compra.items.map((item) => ({
            id_item: item.id_item,
            id_articulo: Number(item.id_articulo),
            descripcion: item.descripcion || "",
            cantidad: Number(item.cantidad) || 1,
            unidad_medida: item.unidad_medida || "",
            precio_unitario: Number(item.precio_unitario) || 0,
            iva: item.iva !== undefined ? String(Number(item.iva)) : "21",
            valor_descuento: Number(item.valor_descuento) || 0,
            subtotal: Number(item.subtotal_con_iva ?? item.subtotal ?? 0),
            observaciones: item.observaciones || "",
            estado_logico: item.estado_logico ?? 1,
            color: item.color || "",
          }))
        : [
            {
              id_item: "",
              id_articulo: "",
              descripcion: "",
              cantidad: 1,
              unidad_medida: "",
              precio_unitario: 0,
              iva: "21",
              valor_descuento: 0,
              subtotal: 0,
              observaciones: "",
              estado_logico: 1,
              color: "",
            },
          ],
  };
}

// De Form (OCFormData) a Backend (SupplierCompra)
export function toApiData(form) {
  return {
    id_proveedor: form.id_proveedor,
    fecha_emision: form.fecha_emision
      ? form.fecha_emision.toISOString().slice(0, 10)
      : "",
    fecha_entrega: form.fecha_entrega
      ? form.fecha_entrega.toISOString().slice(0, 10)
      : null,
    fecha_vencimiento: form.fecha_vencimiento
      ? form.fecha_vencimiento.toISOString().slice(0, 10)
      : null,
    fecha_contable: form.fecha_contable
      ? form.fecha_contable.toISOString().slice(0, 10)
      : null,
    condicion_pago: form.condicion_pago,
    lugar_entrega: form.lugar_entrega,
    monto_total: Number(form.monto_total),
    estado_compra: form.estado_compra,
    observaciones: form.observaciones ?? "",
    estado_logico: form.estado_logico ?? 1,
    url_orden_compra_comprobante: form.url_orden_compra_comprobante ?? "",
    descuento_aplicado: 0, // El backend los calculará
    subtotal: 0,
    iva_total: 0,
    items: (form.items ?? []).map((item) => ({
      id_item: item.id_item ? Number(item.id_item) : undefined,
      id_articulo: Number(item.id_articulo),
      nombre_articulo: item.nombre_articulo ?? "",
      descripcion: item.descripcion ?? "",
      cantidad: Number(item.cantidad),
      codigo_interno: item.codigo_interno ?? "",
      unidad_medida: item.unidad_medida || "",
      precio_unitario: Number(item.precio_unitario),
      iva: Number(item.iva),
      subtotal_con_iva: Number(item.subtotal_con_iva) || 0,
      color: item.color ?? "",
      valor_descuento: Number(item.valor_descuento),
      subtotal: Number(item.subtotal),
      observaciones: item.observaciones ?? "",
      estado_logico: item.estado_logico === 1 ? 1 : 0,
    })),
    // Los campos opcionales que no envíes los maneja el backend
  };
}
