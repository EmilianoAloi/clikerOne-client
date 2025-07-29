import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, FileText } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(dateInput) {
  if (!dateInput) return "-";
  const iso = dateInput instanceof Date ? dateInput.toISOString() : dateInput;
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export default function ProveedorInvoiceViewHeader({ factura }) {
  // Formateador de moneda
  const fmt = (n) =>
    n.toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  // Cálculos de totales
  const subtotal =
    factura.items?.reduce(
      (acc, { cantidad = 0, precio_unitario = 0 }) =>
        acc + cantidad * precio_unitario,
      0
    ) ?? 0;

  const descuentoTotal =
    factura.items?.reduce(
      (acc, { cantidad = 0, precio_unitario = 0, valor_descuento = 0 }) => {
        const bruto = cantidad * precio_unitario;
        return acc + (bruto * valor_descuento) / 100;
      },
      0
    ) ?? 0;

  const totalIVA =
    factura.items?.reduce(
      (
        acc,
        { cantidad = 0, precio_unitario = 0, iva = 0, valor_descuento = 0 }
      ) => {
        const bruto = cantidad * precio_unitario;
        const neto = bruto * (1 - valor_descuento / 100);
        return acc + (neto * iva) / 100;
      },
      0
    ) ?? 0;

  const iibb = Number(factura.percepcion_iibb || 0);
  const otrosImpuestos = Number(factura.otros_impuestos || 0);

  const totalReal =
    subtotal - descuentoTotal + totalIVA + iibb + otrosImpuestos;

  return (
    <div className="md:container mx-auto md:px-2 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* — Columna principal (span 2) — */}
        <div className="lg:col-span-2 space-y-3">
          {/* Proveedor + Estado */}
          <Card className="rounded-xs shadow-none md:border-solid py-6">
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {factura.proveedor_contacto}
                  </h2>
                  <p className="text-xl font-medium text-gray-700">
                    CUIT: {factura.cuit_proveedor}
                  </p>
                  <Link
                    to={`/proveedores/${factura.id_proveedor}`}
                    className="hidden md:block mt-2 text-slate-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Ver detalles del proveedor →
                  </Link>
                </div>
                <div className="text-right">
                  <p className="text-lg text-left font-medium text-gray-700">
                    Cliente:
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    Mundo Plastic SRL
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Información de la factura */}
          <Card className="py-4 rounded-xs shadow-none gap-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg !font-semibold">
                <BadgeInfo className="h-4 w-4" />
                Información de la factura
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 gap-x-6 text-md font-semibold">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">
                    Condición de venta
                  </span>
                  <span className="text-gray-900 mt-1">
                    {factura.condicion_venta || "-"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">
                    Fecha emisión
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {formatDate(factura.fecha_emision)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">
                    Fecha vencimiento
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {formatDate(factura.fecha_vencimiento)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">
                    Fecha contable
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {formatDate(factura.fecha_contable)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* — Columna de Resumen — */}
        <Card className="hidden md:block rounded-xs shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5" />
              Resumen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento aplicado:</span>
                <span>{fmt(descuentoTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA:</span>
                <span>{fmt(totalIVA)}</span>
              </div>
              <div className="flex justify-between">
                <span>IIBB:</span>
                <span>{fmt(iibb)}</span>
              </div>
              <div className="flex justify-between">
                <span>Otros impuestos:</span>
                <span>{fmt(otrosImpuestos)}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-base">
              <span>Total:</span>
              <span>{fmt(totalReal)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
