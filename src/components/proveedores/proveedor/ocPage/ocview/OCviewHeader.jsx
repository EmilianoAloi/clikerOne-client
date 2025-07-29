import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Info, FileText } from "lucide-react";
import { Link } from "react-router-dom";

function formatDate(dateInput) {
  if (!dateInput) return "-";
  const iso = dateInput instanceof Date ? dateInput.toISOString() : dateInput;
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export default function OrderCompraView({ orden }) {
  return (
    <div className="md:container mx-auto md:px-2 mt-">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* — Columna principal (span 2) — */}
        <div className="lg:col-span-2 space-y-3">
          {/* Proveedor destacado */}
          <Card className="rounded-xs shadow-none md:border-solid py-6 ">
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {orden.proveedor?.nombre || "-"}
                  </h2>
                  <p className="text-xl font-medium text-gray-700">
                    CUIT: {orden.proveedor?.cuit || "-"}
                  </p>
                  <Link
                    to={`/proveedores/${orden.id_proveedor}`}
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

          {/* Información de Orden de Compra */}
          <Card className="py-4 rounded-xs shadow-none gap-2">
            <CardHeader className="">
              <CardTitle className="flex items-center gap-2 text-lg !font-semibold">
                <Info className="h-4 w-4" />
                Información de Orden de compra
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 md:grid-cols-4 gap-x-6  text-md font-semibold">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide ">
                    Condición de pago
                  </span>
                  <span className="text-gray-900  mt-1">
                    {orden.condicion_pago || "-"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide ">
                    Fecha emisión
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {formatDate(orden.fecha_emision)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide">
                    Fecha entrega
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {formatDate(orden.fecha_entrega)}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs uppercase tracking-wide ">
                    Lugar de entrega
                  </span>
                  <span className="text-gray-900 font-semibold mt-1">
                    {orden.lugar_entrega || "-"}
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
                <span className="text-muted-foreground">Subtotal:</span>
                <span>
                  {orden.subtotal != null
                    ? `$${Number(orden.subtotal).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Descuento aplicado:
                </span>
                <span>
                  {orden.descuento_aplicado != null
                    ? `$${Number(orden.descuento_aplicado).toLocaleString(
                        "es-AR",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA:</span>
                <span>
                  {orden.iva_total != null
                    ? `$${Number(orden.iva_total).toLocaleString("es-AR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "-"}
                </span>
              </div>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between font-bold text-base">
              <span>Total:</span>
              <span>
                {orden.monto_total != null
                  ? `$${Number(orden.monto_total).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : "-"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
