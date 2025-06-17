import { formatCurrency } from "@/lib/utils";
import { CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function OPviewTitle({ pago }) {
  const totalAplicado = pago.items.reduce(
    (acc, item) => acc + parseFloat(item.monto_aplicado),
    0
  );

  return (
    <CardHeader className="border-x border-t md:border rounded-t-lg mb-4 mt-[-5rem] md:mt-0 px-0 md:px-6 md:pt-6 pb-4 mb-0">
      <div className="flex md:flex-row justify-between items-start md:items-end w-full">
        {/* Izquierda: título y proveedor */}
        <div>
          <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold md:font-bold">
            Orden de Pago #{pago.id_pago}
          </div>
          <p className="text-md text-muted-foreground">
            Fecha de creación:{" "}
            {format(new Date(pago.fecha_creada), "dd/MM/yyyy", { locale: es })}
          </p>
        </div>
        {/* Derecha: monto total */}
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-semibold md:font-bold mb-2">
            {formatCurrency(totalAplicado)}
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
