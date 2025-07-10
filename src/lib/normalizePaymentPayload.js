export default function normalizePaymentPayload({
  items,
  idProveedor,
  observaciones,
  archivos,
  facturas,
  usuarioId = 1,
  idEmpresa = 1,
}) {
  const now = new Date().toISOString();

  // Usar la fecha del primer ítem como base para la orden
  const fecha = items[0]?.fecha ? new Date(items[0].fecha) : new Date();

  // Calcular el monto total de la orden de pago
  const totalMonto = items.reduce((acc, item) => acc + (item.monto ?? 0), 0);

  // Una sola orden de pago (proveedor_pago)
  const pagos = [
    {
      id_proveedor: idProveedor,
      numero_comprobante: "",
      fecha: fecha.toISOString().slice(0, 10),
      fecha_pago: fecha.toISOString().slice(0, 10),
      fecha_ejecucion: fecha.toISOString().slice(0, 10),
      medio: "",
      banco: "",
      monto: totalMonto,
      estado_pago: "ejecutada",
      estado_factura: "sin_factura",
      observaciones,
      fecha_creada: now,
      creado_por: usuarioId,
      modificado_por: usuarioId,
      fecha_modificacion: now,
      sync_origen: "manual",
      estado_logico: 1,
      id_empresa: idEmpresa,
      tipo_id_empresa: "manual",
      tipo_documento: "orden_pago",
      adjuntos: archivos,
    },
  ];

  return {
    observaciones,
    pagos,
    items,
    facturas,
  };
}
