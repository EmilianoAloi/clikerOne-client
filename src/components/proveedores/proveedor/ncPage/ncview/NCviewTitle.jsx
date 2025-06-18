import BadgeEstado from "@/components/ui/badge-custom";
import { CardHeader } from "@/components/ui/card";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(amount);

export default function NCviewTitle({ notaCredito }) {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <CardHeader className="rounded-t-lg mb-4 mt-[-5rem] md:mt-0 px-0 md:px-2">
      <div className="flex md:flex-row justify-between items-start md:items-start w-full ">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            Nota de Crédito #{notaCredito.numero_factura}
          </div>
          <p className="text-md text-muted-foreground">
            Fecha contable: {formatDate(notaCredito.fecha_contable ?? "")}
          </p>
        </div>

        <div className="text-right ">
          <div className="text-4xl font-bold mb-2">
            {formatCurrency(notaCredito.monto_total || 0)}
          </div>
          <BadgeEstado
            estado={(notaCredito.estado_saldo || "").toLowerCase().trim()}
            className="mt-1"
          />
        </div>
      </div>
    </CardHeader>
  );
}
