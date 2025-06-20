import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Boxes } from "lucide-react";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(Number(amount));

export default function ProveedorInvoiceViewItems({ items }) {
  return (
    <Card className="mt-5 none md:border md:shadow-md px-0 md:px-4">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl !mb-0  px-0">
          <Boxes className="w-5 h-5" />
          Detalle de ítems
        </CardTitle>
        <CardDescription className="hidden md:block">
          Listado de articulos incluidos en la factura
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Artículo</th>
                <th className="text-right py-3 px-4 font-semibold">Cantidad</th>
                <th className="text-right py-3 px-4 font-semibold">
                  Precio unitario
                </th>
                <th className="text-right py-3 px-4 font-semibold">IVA</th>
                <th className="text-right py-3 px-4 font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const cantidad = Number(item.cantidad) || 0;
                const precio = Number(item.precio_unitario) || 0;
                const iva = Number(item.iva) || 0;
                const subtotal = cantidad * precio;
                const subtotalConIVA = subtotal + (subtotal * iva) / 100;

                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-3 px-4">{item.nombre_articulo}</td>
                    <td className="text-right py-3 px-4">{cantidad}</td>
                    <td className="text-right py-3 px-4">
                      {formatCurrency(precio)}
                    </td>
                    <td className="text-right py-3 px-4">{iva}%</td>
                    <td className="text-right py-3 px-4 font-medium">
                      {formatCurrency(subtotalConIVA)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} className="text-right py-3 px-4 font-bold">
                  TOTAL:
                </td>
                <td className="text-right py-3 px-4 font-bold">
                  {formatCurrency(
                    items.reduce((acc, item) => {
                      const cantidad = Number(item.cantidad) || 0;
                      const precio = Number(item.precio_unitario) || 0;
                      const iva = Number(item.iva) || 0;
                      const subtotal = cantidad * precio;
                      return acc + subtotal + (subtotal * iva) / 100;
                    }, 0)
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
