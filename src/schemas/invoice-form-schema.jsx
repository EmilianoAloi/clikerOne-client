import { z } from "zod";

const impuestoSchema = z.object({
  detalle: z.string().optional().nullable(),
  base_imponible: z
    .preprocess(
      (v) => (v === "" ? 0 : Number(v)),
      z.number().min(0, "Base >= 0")
    )
    .optional()
    .nullable(),
  alicuota: z
    .preprocess(
      (v) => (v === "" ? 0 : Number(v)),
      z.number().min(0, "Alicuota >= 0")
    )
    .optional()
    .nullable(),
});

export const invoiceItemSchema = z.object({
  id_articulo: z.union([
    z.number().int().positive(),
    z.literal(-1),
    z.literal(-2),
    z.null(),
  ]),
  nombre_manual: z.string().max(255).optional().nullable(),
  cantidad: z.preprocess(
    (v) => (v === "" ? 0 : Number(v)),
    z.number().min(0.01, "Debe ser mayor a 0")
  ),
  precio_unitario: z.preprocess(
    (v) => (v === "" ? 0 : Number(v)),
    z.number().min(0, "Debe ser >= 0")
  ),
  valor_descuento: z.preprocess(
    (v) => (v === "" ? 0 : Number(v)),
    z.number().min(0, "Debe ser >= 0").max(100, "Máx 100%")
  ),
  subtotal_manual: z.number().optional().nullable(),
  iva: z
    .preprocess(
      (v) => (v === "" ? 0 : typeof v === "string" ? Number(v) : v),
      z.number().min(0).max(100)
    )
    .nullable(),
});

export const invoiceFormSchema = z.object({
  proveedor: z.string().min(1, "Debe seleccionar un proveedor"),
  numero_factura: z
    .string()
    .min(1, "Ingrese el número de factura")
    .max(20, "Máximo 20 caracteres"),
  items: z.array(invoiceItemSchema).min(1, "Debe cargar al menos un ítem"),
  url_factura_comprobante: z
    .union([z.string().url("Debe ser una URL válida"), z.null()])
    .optional()
    .nullable(),
  observaciones: z.string().optional().nullable(),
  iibb_porcentaje: z
    .preprocess((v) => (v === "" ? 0 : Number(v)), z.number().min(0).max(10))
    .default(0)
    .optional(),
  condicion_venta: z.string().optional().nullable(),
  tipo_comprobante: z
    .string()
    .min(1, "Debe seleccionar un tipo de comprobante"),
  fecha_emision: z.string().optional().nullable(),
  fecha_vencimiento: z.string().optional().nullable(),
  fecha_contable: z.string().optional().nullable(),
  percepcion_iibb: z.string().optional().nullable(),
  impuestos: z.array(impuestoSchema).optional().default([]),
});
