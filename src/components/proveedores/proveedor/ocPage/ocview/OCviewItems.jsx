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

const OCviewItems = ({ items }) => {
  return (
    <Card className="mt-3 rounded-xs shadow-none md:border  px-0 md:px-4 mx-2">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl !mb-0 px-0">
          <Boxes className="w-5 h-5" />
          Detalle de artículos
        </CardTitle>
        <CardDescription className="hidden md:block">
          Listado de artículos incluidos en la orden de compra
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
                  U. medida
                </th>
                <th className="text-right py-3 px-4 font-semibold">
                  Precio unitario
                </th>
                <th className="text-right py-3 px-4 font-semibold">% IVA</th>
                <th className="text-right py-3 px-4 font-semibold">% Desc.</th>
                <th className="text-right py-3 px-4 font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(items ?? []).map((item, idx) => (
                <tr key={item.id_item || idx} className="border-b">
                  <td className="py-3 px-4">
                    {item.articulo?.codigo_interno && (
                      <span className="me-1 text-muted-foreground">
                        [{item.articulo.codigo_interno}] -
                      </span>
                    )}
                    {item.articulo?.nombre}
                  </td>

                  <td className="text-right py-3 px-4">{item.cantidad}</td>
                  <td className="text-right py-3 px-4">{item.unidad_medida}</td>
                  <td className="text-right py-3 px-4">
                    {formatCurrency(item.precio_unitario)}
                  </td>
                  <td className="text-right py-3 px-4">{item.iva}</td>
                  <td className="text-right py-3 px-4">
                    {item.valor_descuento}
                  </td>
                  <td className="text-right py-3 px-4 font-medium">
                    {formatCurrency(
                      Number(item.subtotal || 0) +
                        Number(item.subtotal || 0) *
                          (Number(item.iva || 0) / 100)
                    )}{" "}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={6} className="text-right py-3 px-4 font-bold">
                  TOTAL:
                </td>
                <td className="text-right py-3 px-4 font-bold">
                  {formatCurrency(
                    (items ?? []).reduce((acc, item) => {
                      const base = Number(item.subtotal || 0);
                      const iva = base * (Number(item.iva || 0) / 100);
                      return acc + base + iva;
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
};

export default OCviewItems;
