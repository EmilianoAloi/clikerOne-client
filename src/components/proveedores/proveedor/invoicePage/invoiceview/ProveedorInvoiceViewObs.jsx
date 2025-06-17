import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText } from "lucide-react";

export default function ProveedorInvoiceViewObs({ factura }) {
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
    <div className="flex gap-2 mt-5 mb-5">
      <Card className="w-1/2 md:w-full border-none shadow-none md:border md:shadow-md ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2  text-xl">
            <FileText className="w-5 h-5" />
            Observaciones
          </CardTitle>
          <CardDescription>
            Notas o comentarios adicionales sobre la factura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {factura.observaciones?.trim()
              ? factura.observaciones
              : "No hay observaciones en la factura."}
          </p>
        </CardContent>
      </Card>

      {/* Resumen de montos SOLO EN MOBILE */}
      <Card className="w-1/2 md:hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calculator className="w-5 h-5" />
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
            <span>${factura.monto_total}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
