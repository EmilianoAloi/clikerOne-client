import { z } from "zod";

// ----------- SCHEMA PARA OCItem -----------
export const ocItemSchema = z.object({
  id_item: z.union([z.string(), z.number()]).optional(),
  id_articulo: z.union([z.number(), z.literal("")]), // <- acepta number o string vacío
  descripcion: z.string(),
  cantidad: z.number().min(1, "La cantidad debe ser al menos 1"),
  unidad_medida: z.string().nonempty("Unidad requerida"),
  precio_unitario: z.number(),
  iva: z.string().nonempty("IVA requerido"),
  color: z.string().optional().nullable(),
  valor_descuento: z.number().min(0, "El descuento no puede ser negativo"),
  subtotal: z.number(),
  observaciones: z.string().optional(),
  estado_logico: z.union([z.literal(0), z.literal(1)]).optional(),
});

// ----------- SCHEMA PARA OCFormData -----------
export const ocFormSchema = z.object({
  id_proveedor: z.number(),
  fecha_emision: z.date({ required_error: "Fecha de emisión requerida" }),
  fecha_entrega: z.date({ required_error: "Fecha de entrega requerida" }),
  fecha_vencimiento: z.date().optional(),
  fecha_contable: z.date({ required_error: "Fecha contable requerida" }),
  condicion_pago: z.string().nonempty("Debe seleccionar una condición de pago"),
  lugar_entrega: z.string().nonempty("Debe seleccionar un lugar de entrega"),
  monto_total: z.number().min(0, "El monto total no puede ser negativo"),
  estado_compra: z.enum([
    "pendiente",
    "en_proceso",
    "entregada",
    "cancelada",
    "vencida",
    "parcial",
    "anulada",
  ]),
  observaciones: z.string().optional(),
  estado_logico: z.union([z.literal(0), z.literal(1)]),
  url_orden_compra_comprobante: z.union([
    z.string().url("Debe ser una URL válida"),
    z.literal(""),
    z.undefined(),
  ]),
  archivo_comprobante: z
    .union([z.instanceof(File), z.string()])
    .optional()
    .nullable(),
  items: z.array(ocItemSchema).min(1, "Debe agregar al menos un ítem"),
});
