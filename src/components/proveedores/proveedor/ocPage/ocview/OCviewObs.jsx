import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calculator, FileText } from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(amount));

const OCviewObs = ({ orden }) => {
  // Cálculos igual que en items
  const totalIVA =
    orden.items?.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const iva = Number(item.iva) || 0;
      const descuento = Number(item.valor_descuento) || 0;
      const bruto = cantidad * precio;
      const neto = bruto - (bruto * descuento) / 100;
      return acc + (neto * iva) / 100;
    }, 0) ?? 0;

  const subtotal =
    orden.items?.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      return acc + cantidad * precio;
    }, 0) ?? 0;

  const descuentoTotal =
    orden.items?.reduce((acc, item) => {
      const descuento = Number(item.valor_descuento) || 0;
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const bruto = cantidad * precio;
      return acc + (bruto * descuento) / 100;
    }, 0) ?? 0;

  const total =
    orden.items?.reduce((acc, item) => {
      const cantidad = Number(item.cantidad) || 0;
      const precio = Number(item.precio_unitario) || 0;
      const iva = Number(item.iva) || 0;
      const descuento = Number(item.valor_descuento) || 0;
      const bruto = cantidad * precio;
      const neto = bruto - (bruto * descuento) / 100;
      const subtotalConIVA = neto + (neto * iva) / 100;
      return acc + subtotalConIVA;
    }, 0) ?? 0;

  return (
    <div className="flex gap-2 mt-5 mb-5">
      {/* Observaciones */}
      <Card className="w-1/2 md:w-full border-none shadow-none md:border md:shadow-md ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2  text-xl">
            <FileText className="w-5 h-5" />
            Observaciones
          </CardTitle>
          <CardDescription className="hidden md:block">
            Notas o comentarios adicionales sobre la orden de compra
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {orden.observaciones?.trim()
              ? orden.observaciones
              : "No hay observaciones en la orden de compra."}
          </p>
        </CardContent>
      </Card>

      {/* Resumen montos (solo mobile) */}
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
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Descuento aplicado:</span>
              <span>{formatCurrency(descuentoTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">IVA:</span>
              <span>{formatCurrency(totalIVA)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Forma de pago:</span>
              <span>{orden.condicion_pago}</span>
            </div>
          </div>
          <Separator className="mt-2 mb-2" />
          <div className="flex justify-between font-bold  text-base">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OCviewObs;
