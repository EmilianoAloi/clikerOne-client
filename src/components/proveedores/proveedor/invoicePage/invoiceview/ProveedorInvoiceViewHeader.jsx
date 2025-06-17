import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, FileText } from "lucide-react";
import { Link } from "react-router-dom"; // Usá react-router-dom

export default function ProveedorInvoiceViewHeader({ factura }) {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const totalIVA =
    factura.items?.reduce((acc, item) => {
      const cantidad = item.cantidad || 0;
      const precio = item.precio_unitario || 0;
      const iva = item.iva || 0;
      return acc + (Number(cantidad) * Number(precio) * iva) / 100;
    }, 0) ?? 0;

  const subtotal =
    factura.items?.reduce((acc, item) => {
      const cantidad = item.cantidad || 0;
      const precio = item.precio_unitario || 0;
      return acc + Number(cantidad) * Number(precio);
    }, 0) ?? 0;

  const descuentoTotal =
    factura.items?.reduce((acc, item) => {
      const descuento = item.valor_descuento || 0;
      const cantidad = item.cantidad || 0;
      const precio = item.precio_unitario || 0;
      const bruto = Number(cantidad) * Number(precio);
      return acc + (bruto * Number(descuento)) / 100;
    }, 0) ?? 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 ">
      {/* Información del proveedor y factura */}
      <Card className="col-span-2 border-none shadow-none md:border md:shadow-md px-0 md:px-4">
        <CardHeader className="px-0 ">
          <CardTitle className="flex items-center gap-2 text-xl font-semibold leading-none px-0  ">
            <BadgeInfo className="w-5 h-5" />
            Información de la factura
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 md:px-2">
          <div className="grid grid-cols-2 md:gap-8 max-w-full">
            <div className="flex flex-col ">
              <h3 className="font-semibold text-md text-muted-foreground ">
                Proveedor
              </h3>
              <p className="font-semibold">{factura.proveedor_contacto}</p>
              <p className="text-sm">CUIT: {factura.cuit_proveedor}</p>
              <p className="text-sm">
                {factura.direccion_proveedor}, {factura.proveedor_provincia}
              </p>
              <Link
                to={`/proveedores/${factura.id_proveedor}`}
                className="text-primary text-sm font-medium inline-block mt-2"
              >
                Ver detalles del proveedor →
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Número de factura
                  </h3>
                  <p>#{factura.numero_factura}</p>
                </div>
                {factura.condicion_venta && (
                  <div className="block md:hidden">
                    <h3 className="font-semibold text-md text-muted-foreground ">
                      Condición de venta
                    </h3>
                    <p className="text-md">{factura.condicion_venta}</p>
                  </div>
                )}
                <div className="hidden md:block">
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Estado
                  </h3>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-md
                    ${
                      factura.estado_saldo === "pagada"
                        ? "bg-green-100 text-green-800"
                        : factura.estado_saldo === "parcial"
                        ? "bg-yellow-100 text-yellow-800"
                        : factura.estado_saldo === "pendiente de pago"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {(factura.estado_saldo || "Sin estado")
                      .charAt(0)
                      .toUpperCase() +
                      (factura.estado_saldo || "Sin estado").slice(1)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Fecha de emisión
                  </h3>
                  <p>{formatDate(factura.fecha_emision ?? "")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Fecha de vencimiento
                  </h3>
                  <p>{formatDate(factura.fecha_vencimiento ?? "")}</p>
                </div>
              </div>
              {factura.condicion_venta && (
                <div className="mt-4 hidden md:block">
                  <h3 className="font-semibold text-md text-muted-foreground ">
                    Condición de venta
                  </h3>
                  <p className="text-md">{factura.condicion_venta}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de montos */}
      <Card className="hidden md:block border-none shadow-none md:border md:shadow-md">
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
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Descuento aplicado:</span>
              <span className="">{descuentoTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA:</span>
              <span>${totalIVA.toFixed(2)}</span>{" "}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IIBB:</span>
              <span>{factura.percepcion_iibb}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Forma de pago:</span>
              <span>{factura.condicion_venta}</span>
            </div>
          </div>
          <Separator className="mt-2 mb-2" />
          <div className="flex justify-between font-bold  text-base">
            <span>Total:</span>
            <span>{factura.monto_total}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
