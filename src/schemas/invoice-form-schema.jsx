import { z } from "zod";

// --- Sub-schema: Item de factura ---
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
  iva: z.union([z.number(), z.string(), z.null()]),
});

// --- Schema: Formulario de factura ---
export const invoiceFormSchema = z.object({
  proveedor: z.string().min(1, "Debe seleccionar un proveedor"),
  numero_factura: z
    .string()
    .min(1, "Ingrese el número de factura")
    .max(20, "Máximo 20 caracteres"),
  items: z.array(invoiceItemSchema),
  url_factura_comprobante: z.any().optional().nullable(),
  observaciones: z.string().optional().nullable(),
  iibb_porcentaje: z.number().min(0).max(10).default(0).optional(),
  condicion_venta: z.any().optional().nullable(),
});
