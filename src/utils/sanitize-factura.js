export function sanitizeFactura(factura) {
  if (!factura) return {};
  return {
    ...factura,
    fecha_emision: factura.fecha_emision ?? "",
    fecha_vencimiento: factura.fecha_vencimiento ?? "",
    fecha_contable: factura.fecha_contable ?? "",
  };
}
